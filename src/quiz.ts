import {initJsPsych} from 'jspsych';
import htmlButtonResponse from '@jspsych/plugin-html-button-response';
import type { Category } from './models';



function runWords(category: Category, max_time=60){
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.innerHTML = "<p class=\"title\">"+category.fullName+"</p>"
    overlay.id = "pyramidy-target"

    const timer = document.createElement("span");
    timer.classList.add("pyramidy-timer");
    
    document.getElementById("app-container")?.appendChild(overlay);
    document.getElementById("app-container")?.appendChild(timer);

    let timerInterval: number=0;
    let remainingTime = max_time;
    if( "max_time" in category){
        remainingTime = category.max_time ?? max_time;
    }
    let jsPsych: ReturnType<typeof initJsPsych>;
    

    function startGame(){
        overlay.removeEventListener("click", startGame);
        jsPsych = initJsPsych({
            display_element: "pyramidy-target",
            timeline : buildPyramidTimeline(category, jsPsych, timer, remainingTime, timerInterval),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            on_finish: (data:any) => {
                clearInterval(timerInterval);
                timer.textContent = "";
                const score = data.select("button_pressed").values.reduce( (acc, cur) =>{
                    return acc + (1-parseInt(cur));
                }, 0);
                overlay.innerHTML = "<p>score: "+ (score - 1).toString() + "</p>";
                setTimeout(()=>{
                    overlay.remove();
                    timer.remove();
                }, 2000)
            }
        })
        
        jsPsych.run(buildPyramidTimeline(category, jsPsych, timer, remainingTime, timerInterval))
    }

    overlay.addEventListener("click", startGame)
    
}

function buildPyramidTimeline(category: Category, jsPsych: ReturnType<typeof initJsPsych>, timer: HTMLSpanElement, remainingTime: number, timerInterval: number){ {
        const intro = 
            {
                type: htmlButtonResponse,
                stimulus: `<p>Vous aurez ${category.max_time} secondes pour faire deviner un maximum de mots! \n Si vous devez deviner, détournez le regard maintenant. </p> \
                        <p> Utilisez les boutons, ou sinon ESPACE pour réussir et P pour passer</p>`,
                choices: ["Débuter!"],
                on_finish: function(data) {
                    timer.textContent = remainingTime.toString();
                    timerInterval = setInterval( () => {
                        remainingTime--;
                        timer.textContent = remainingTime.toString();
                        if(remainingTime < 1){
                            jsPsych.abortExperiment();
                        }
                    }, 1000);
                }
            }
        

        const answers = [...category.words];
        let counter = 0;

        const questions = {
            type: htmlButtonResponse,
            stimulus: () => {
                return "<p>" + answers[counter % answers.length] + "</p>"
            },
            choices: ["réussi", "passe"],
            correct_text:"Bravo!",
            incorrect_text: "ipelaille...",
            feedback_duration: 250,
            response_ends_trial: true,
            key_answer: "s",
            on_finish: (data) => {
                const resp = data.response || data.button_pressed;
                // resp is a string
                if (resp === '0'){
                    answers.splice(counter % answers.length, 1);
                }
                else if(resp === '1' ) {
                    counter++;
                }
                
            },
            on_load: (a) => {
                //attach custom key event listeners to keep current keyboard response
                
                const after_key = (info) => {

                    
                    if (jsPsych.pluginAPI.compareKeys(info.key, " ")){
                        //trigger réussi
                        

                        if (typeof keyboardListener !== 'undefined') {
                            jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
                          }
                          document.getElementById("jspsych-html-button-response-button-0").click();
                    }
                    else if (jsPsych.pluginAPI.compareKeys(info.key, "p")){
                        //trigger passe
                        
                        if (typeof keyboardListener !== 'undefined') {
                            jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
                          }
                        document.getElementById("jspsych-html-button-response-button-1").click();
                    }

                }

                const keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
                    callback_function: after_key,
                    valid_responses: [" ", "p"],
                    rt_method: 'performance',
                    persist: false,
                    allow_held_key: false
                  });
            }
        }
    
    
    
        return [intro, {
            type: htmlButtonResponse,
            timeline: [questions],
            loop_function: () => {
                return answers.length > 0
            }
        }]
    }
}



export default runWords;