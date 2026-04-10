import { useEffect, useRef } from "react";
import { initJsPsych } from "jspsych";
import type { JsPsych } from "jspsych";
import { useGameStore } from "../state";
import htmlButtonResponse from "@jspsych/plugin-html-button-response"
import type { Category, Word } from "../models";

interface Props {
  targetElementId: string;
  categoryIdx: number;
  onRunEnd: ()=>void;
}

const usePyramidPlayer = ({ targetElementId, categoryIdx, onRunEnd }: Props) => {

  const jsPsychRef = useRef<ReturnType<typeof initJsPsych> | null>(null);
  const category = useGameStore((state) => categoryIdx !== null ? state.gameDef?.categories[categoryIdx] : undefined);
  const default_time = useGameStore((state) => state.gameDef?.max_time || 0);
  const answerWord = useGameStore((state) => state.answerWord)
  const timerInterval = useRef<number>(0)
  const remainingTime = useRef<number>(category?.max_time || default_time)
  const wordCounter = useRef<number>(0)
  const timeline = useRef<JsPsych["timeline"]>([])
  const timerSpan = useRef<HTMLDivElement | null>(null)
  const wordsToPlay = category ? category.words.map((word, idx) => ({ ...word, played: false, idx })) : []

  

  const buildIntroTrial = (category: Category) => {
    return {
      type: htmlButtonResponse,
      stimulus: `<p>Vous aurez ${category.max_time || default_time} secondes pour faire deviner un maximum de mots! \n Si vous devez deviner, détournez le regard maintenant. </p> \
              <p> Utilisez les boutons, ou sinon ESPACE pour réussir et P pour passer</p>`,
      choices: ["Débuter!"],
      on_finish: setupTimer
    }
  }

  const buildWordTrial = () => {
    return {
      type: htmlButtonResponse,
      choices: ["réussi", "passe"],
      response_ends_trial: true,
      stimulus: makeStimulus,
      on_finish: onFinishWordGuess,
      on_load: additionalKeysListener,
      data: getWordData
    }
  }

  const makeStimulus = () =>  {
    const wordEntry = wordsToPlay[wordCounter.current % wordsToPlay.length] as Word;
    return `<div>
      ${wordEntry.imgUrl ? `<img src="${wordEntry.imgUrl}" alt="${wordEntry.mot}" />` : ""}
      <p>${wordEntry.mot}</p>
    </div>`
  }

  const getWordData = () => {
    const wordEntry = wordsToPlay[wordCounter.current % wordsToPlay.length];
    return {
      word: wordEntry.mot,
      wordIndex: wordEntry.idx,
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishWordGuess = (data: any) => {
    const resp = data.response === undefined ? parseInt(data.button_pressed) : data.response;
    if (resp === 0){
        wordsToPlay.splice(wordCounter.current % wordsToPlay.length, 1);
        answerWord(categoryIdx, data.wordIndex, data.rt);
    }
    else if(resp === 1 ) {
        wordCounter.current++;
    }
  }

  const additionalKeysListener = () => {
    if(jsPsychRef.current === null) return;

    const after_key = (info: {key: string, rt: number}) => {
      if(jsPsychRef.current === null) return;
      if (jsPsychRef.current.pluginAPI.compareKeys(info.key, " ")){
          //trigger réussi
        if (typeof keyboardListener !== 'undefined') {
            jsPsychRef.current.pluginAPI.cancelKeyboardResponse(keyboardListener);
          }
          (document.querySelector("button.jspsych-btn[data-choice='0']") as HTMLElement)?.click();
      }
      else if (jsPsychRef.current.pluginAPI.compareKeys(info.key, "p")){
          //trigger passe
          if (typeof keyboardListener !== 'undefined') {
              jsPsychRef.current.pluginAPI.cancelKeyboardResponse(keyboardListener);
            }
          (document.querySelector("button.jspsych-btn[data-choice='1']") as HTMLElement)?.click();
      }
    }

    const keyboardListener = jsPsychRef.current.pluginAPI.getKeyboardResponse({
      callback_function: after_key,
      valid_responses: [" ", "p"],
      rt_method: 'performance',
      persist: false,
      allow_held_key: false
    });
  }

  const setupTimer = () => {
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

  const onFinish = () => {
    clearInterval(timerInterval.current);
    onRunEnd();
  }

  useEffect(() => {
    jsPsychRef.current = initJsPsych({
      display_element: targetElementId,
      on_finish: onFinish
    });
    // jsPsych instance should be created once per target element.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetElementId])

  useEffect(() => {
    if (!jsPsychRef.current || !category) return;

    const introTrial = buildIntroTrial(category);
    const wordTrial = buildWordTrial();
    const media = category.words.map(word => word.imgUrl).filter((url): url is string => !!url);
    jsPsychRef.current.pluginAPI.preloadImages(media);

    timeline.current = [
      introTrial,
      {
        type: htmlButtonResponse,
        timeline: [wordTrial],
        loop_function: () => wordsToPlay.length > 0
      }
    ]
    // Timeline rebuild is intentionally driven by category changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  const startPyramid = () => {
    if (jsPsychRef.current && timeline.current.length > 0) {
      jsPsychRef.current.run(timeline.current);
    }
  }

  return { startPyramid, timerSpan }
}

export default usePyramidPlayer;