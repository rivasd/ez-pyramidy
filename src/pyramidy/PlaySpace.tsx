import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { initJsPsych } from "jspsych"
import htmlButtonResponse from "@jspsych/plugin-html-button-response"
import { useGameStore } from "../state"
import Recap from "./Recap"
import { Button, Stack } from "@mantine/core"

interface PlaySpaceProps {
  categoryIdx: number
  onEnd: ()=>void
}

const PlaySpace = ({ categoryIdx, onEnd }: PlaySpaceProps) => {
  const category = useGameStore((state) => state.gameDef?.categories[categoryIdx]);

  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const timerInterval = useRef<number>(0)
  const default_time = useGameStore((state) => state.gameDef?.max_time || 0);
  const remainingTime = useRef<number>(category?.max_time || default_time)
  const timerSpan = useRef<HTMLSpanElement | null>(null)
  const jsPsychRef = useRef<ReturnType<typeof initJsPsych> | null>(null)
  const playCategory = useGameStore((state) => state.playCategory)
  const setCurrentTeam = useGameStore((state) => state.setCurrentTeam)
  const answerWord = useGameStore((state) => state.answerWord)

  const onFinish = (data: any) => {
    clearInterval(timerInterval.current);
    const score = data.select("button_pressed").values.reduce((acc: number, cur: string) => {
      return acc + (1 - parseInt(cur));
    }, 0);
    alert("score: " + (score - 1).toString());
    setStarted(false);
    setDone(true);
  }

  const onStartGuessing = () => {
    remainingTime.current = category?.max_time || default_time;
    if (timerSpan.current) {
      timerSpan.current.textContent = remainingTime.current.toString();
    }
    timerInterval.current = window.setInterval(() => {
      remainingTime.current--;
      if (timerSpan.current) {
        timerSpan.current.textContent = remainingTime.current.toString();
      }
      if (remainingTime.current < 1) {
        if (jsPsychRef.current) {
          jsPsychRef.current.abortExperiment();
        }
      }
    }, 1000);
  }

  

  const buildPyramidTimeline = useCallback(() => {

    const jsPsych = jsPsychRef.current!;

    const intro = {
      type: htmlButtonResponse,
      stimulus: `<p>Vous aurez ${category.max_time} secondes pour faire deviner un maximum de mots! \n Si vous devez deviner, détournez le regard maintenant. </p> \
              <p> Utilisez les boutons, ou sinon ESPACE pour réussir et P pour passer</p>`,
      choices: ["Débuter!"],
      on_finish: onStartGuessing
    }

    const answers = [...category.words];
    let counter = 0;

    const onFinishWordGuess = (data: any) => {
      const resp = data.response === undefined ? parseInt(data.button_pressed) : data.response;
      if (resp === 0){
          answers.splice(counter % answers.length, 1);
          answerWord(categoryIdx, category?.words.indexOf(answers[counter % answers.length]), data.rt);
      }
      else if(resp === 1 ) {
          counter++;
      }
    }

    const questions = {
      type: htmlButtonResponse,
      stimulus: () => {
          return "<p>" + answers[counter % answers.length].mot + "</p>"
      },
      choices: ["réussi", "passe"],
      correct_text:"Bravo!",
      incorrect_text: "ipelaille...",
      feedback_duration: 250,
      response_ends_trial: true,
      key_answer: "s",
      on_finish: onFinishWordGuess,
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

  }, [category?.displayName, categoryIdx, answerWord])

  const startGame = useCallback(() => {
    jsPsychRef.current = initJsPsych({
      display_element: "pyramidy-target",
      on_finish: onFinish
    })
    jsPsychRef.current!.run(buildPyramidTimeline());
  }, [buildPyramidTimeline])

  useLayoutEffect(() => {
    if (started) {
      startGame();
    }
  }, [started, startGame])

  return (
    <div className="overlay" >
      {!started ? 
        <>
          {done ? 
            <Recap categoryIdx={categoryIdx} onEnd={onEnd}/> 
            : 
            <Stack>
              <p className="title">{category.fullName}</p>
              <Button onClick={() => setStarted(true)}>
                Commencer
              </Button>
            </Stack>
          }
        </>
        : 
        <>
          <span ref={timerSpan} className="pyramidy-timer"></span>
          <div id="pyramidy-target" />
      </>
      }
    </div>
  )
}

export default PlaySpace