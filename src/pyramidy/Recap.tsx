import { Button, List, Stack } from "@mantine/core";
import { useGameStore } from "../state";

const Recap = ({ categoryIdx, onEnd }: { categoryIdx: number, onEnd: () => void }) => {

  const category = useGameStore((state) => state.gameDef?.categories[categoryIdx]);

  return (
    <Stack>
      <List>
        {category?.words.map((word, idx) => (
          <List.Item key={idx}>{word.mot} - {word.success ? "Réussi" : "Raté"} {word.responseTime ? `(${word.responseTime / 1000} s)` : ""}</List.Item>
        ))}
      </List>
      <Button onClick={onEnd}>
        Terminer
      </Button>
    </Stack>
  )
}

export default Recap