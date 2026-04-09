import { useEffect, useState } from "react";
import { initJsPsych } from "jspsych";
import { useGameStore } from "../state";


const useJsPsych = () => {

  const [jsPsych, setJsPsych] = useState<ReturnType<typeof initJsPsych> | null>(null);
  const [currentCategory, setCurrentCategory] = useState<number | null>(null);
  const category = useGameStore((state) => currentCategory !== null ? state.gameDef?.categories[currentCategory] : undefined);

  useEffect(() => {
    const jsPsych = initJsPsych(
      {}
    )
    setJsPsych(jsPsych);
  }, [category])
}

export default useJsPsych;