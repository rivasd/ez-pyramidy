/* global jsPsych */


function runWords(category, ref){
    var overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.innerHTML = "<p class=\"title\">"+category.fullName+"</p>"
    overlay.id = "pyramidy-target"

    var timer = document.createElement("span");
    timer.classList.add("pyramidy-timer");
    
    document.getElementById("app-container").appendChild(overlay);
    document.getElementById("app-container").appendChild(timer);

    var timerInterval
    var remainingTime = 60;

    function startGame(){
        overlay.removeEventListener("click", startGame);
        jsPsych.init({
            display_element: "pyramidy-target",
            timeline : buildPyramidTimeline(category),
            on_finish: function(data){
                var score = data.select("button_pressed").values.reduce( (acc, cur) =>{
                    var value = parseInt(cur, 10);
                    return acc + value === 0? 1: 0;
                }, 0);
                overlay.innerHTML = "<p>score: "+ score + "</p>";
                setTimeout(()=>{
                    overlay.remove();
                    timer.remove();
                }, 2000)
                
            }
        })
    }

    overlay.addEventListener("click", startGame)

    function buildPyramidTimeline(category) {
        var timeline = [
            {
                type: "html-keyboard-response",
                stimulus: "Vous aurez 30 secondes pour faire deviner un maximum de mots. Si vous devez deviner, détournez le regard maintenant. Appuyez sur une touche pour commencer!",
                on_finish: function(data) {
                    timer.textContent = remainingTime.toString();
                    timerInterval = setInterval( () => {
                        remainingTime--;
                        timer.textContent = remainingTime.toString();
                        if(remainingTime < 1){
                            jsPsych.endExperiment();
                            clearInterval(timerInterval);
                        }
                        
                    }, 1000);
                }
            }
        ]
    
        category.words.forEach((word, idx) => {
            timeline.push({
                type: "html-button-response",
                stimulus: "<p>"+word+"</p>",
                choices: ["correct", "passe"]
            })
        })
    
    
        return timeline
    }
}



export default runWords;