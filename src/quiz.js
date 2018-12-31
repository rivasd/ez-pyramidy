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
    var remainingTime = 30;

    function startGame(){
        overlay.removeEventListener("click", startGame);
        jsPsych.init({
            display_element: "pyramidy-target",
            timeline : buildPyramidTimeline(category),
            on_finish: function(data){
                jsPsych.data.displayData("json");
                overlay.remove();
                timer.remove();
                return
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
                stimulus: word,
                choices: ["correct", "passe"]
            })
        })
    
    
        return timeline
    }
}



export default runWords;