import { Button, Group, Stack, Text } from "@mantine/core";
import { useGameStore } from "../state";

const Recap = ({ categoryIdx, onEnd }: { categoryIdx: number, onEnd: () => void }) => {

  const category = useGameStore((state) => state.gameDef?.categories[categoryIdx]);

  return (
    <Stack ml="xl" maw={1200} align="center">
      <Group>
          {category?.words.map((word, idx) => (
            <Stack key={idx} align="center" justify="center">
              {word.imgUrl && <img src={word.imgUrl} alt={word.mot} style={{ height: "300px"}}  />}
              <Text c="var(--mantine-primary-color-filled)">{word.mot} - {word.success ? "Réussi" : "Raté"} {word.responseTime ? `(${word.responseTime / 1000} s)` : ""}</Text>
            </Stack>
          ))}
      </Group>
      <Button onClick={onEnd} maw="200px" >
        Continuer
      </Button>
    </Stack>
  )
}

export default Recap