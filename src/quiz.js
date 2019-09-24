/* global jsPsych */


function runWords(category, max_time=60){
    var overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.innerHTML = "<p class=\"title\">"+category.fullName+"</p>"
    overlay.id = "pyramidy-target"

    var timer = document.createElement("span");
    timer.classList.add("pyramidy-timer");
    
    document.getElementById("app-container").appendChild(overlay);
    document.getElementById("app-container").appendChild(timer);

    var timerInterval
    var remainingTime = max_time;
    if( "max_time" in category){
        remainingTime = category.max_time;
    }
    

    function startGame(){
        overlay.removeEventListener("click", startGame);
        jsPsych.init({
            display_element: "pyramidy-target",
            timeline : buildPyramidTimeline(category),
            on_finish: (data) => {
                clearInterval(timerInterval);
                timer.textContent = "";
                var score = data.select("correct").values.reduce( (acc, cur) =>{
                    return acc + (cur? 1: 0);
                }, 0);
                overlay.innerHTML = "<p>score: "+ score.toString() + "</p>";
                setTimeout(()=>{
                    overlay.remove();
                    timer.remove();
                }, 2000)
            }
        }) 
    }

    overlay.addEventListener("click", startGame)

    function buildPyramidTimeline(category) {
        var intro = 
            {
                type: "html-keyboard-response",
                stimulus: "<p>Vous aurez 30 secondes pour faire deviner un maximum de mots. Si vous devez deviner, détournez le regard maintenant. </p> \
                        <p> Arbitre, appuyez sur 'S' si bonne reponse, 'A' pour passer </p> <p>Appuyez sur une touche pour commencer!</p>",
                on_finish: function(data) {
                    timer.textContent = remainingTime.toString();
                    timerInterval = setInterval( () => {
                        remainingTime--;
                        timer.textContent = remainingTime.toString();
                        if(remainingTime < 1){
                            jsPsych.endExperiment();
                        }
                    }, 1000);
                }
            }
        

        var answers = [...category.words];
        var total_num = answers.length;
        var counter = 0;

        var questions = {
            type: "categorize-html",
            stimulus: () => {
                return "<p>" + answers[counter % answers.length] + "</p>"
            },
            choices: ["a", "s"],
            correct_text:"Bravo!",
            incorrect_text: "ipelaille...",
            feedback_duration: 250,
            key_answer: jsPsych.pluginAPI.convertKeyCharacterToKeyCode("s"),
            on_finish: (data) => {
                if (data.correct){
                    answers.splice(counter % answers.length, 1);
                }
                else{
                    counter++;
                }
                
            }
        }
    
    
    
        return [intro, {
            timeline: [questions],
            loop_function: () => {
                return answers.length > 0
            }
        }]
    }
}



export default runWords;