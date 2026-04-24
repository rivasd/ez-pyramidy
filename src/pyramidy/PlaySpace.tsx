import { useState } from "react"
import { useGameStore } from "../state"
import Recap from "./Recap"
import { Box, Button, Stack, Title } from "@mantine/core"
import usePyramidPlayer from "../hooks/usePyramidPlayer"

interface PlaySpaceProps {
  categoryIdx: number
  onEnd: () => void
}

const PlaySpace = ({ categoryIdx, onEnd }: PlaySpaceProps) => {

  const category = useGameStore((state) => state.gameDef?.categories[categoryIdx]);

  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)

  const { startPyramid, timerSpan } = usePyramidPlayer({
    targetElementId: "pyramidy-target",
    categoryIdx,
    onRunEnd: () => {
      setDone(true);
      setStarted(false);
    }
  })

  return (
    <Box h="100%" w="100%" style={{ textAlign: "center" }}>
      <Stack h="100%" style={{ textAlign: "center" }} justify="stretch" align="center">
        <Box display={started ? 'none' : 'initial'} flex="1">
          <Stack h="100%" justify="center" align="center" gap="xl">
            <Title className="title" c="pyramidYellow" fw="normal">{category!.fullName}</Title>
            {done ?
              (<Recap categoryIdx={categoryIdx} onEnd={onEnd} />)
              :
              <Button
                onClick={() => {
                  setStarted(true);
                  startPyramid();
                }}
                size="md"
                w="200px"
                mx="auto"
              >
                Commencer
              </Button>
            }
          </Stack>
        </Box>
        {!done &&
          <>
            <div ref={timerSpan} className="pyramidy-timer"></div>
            <Box w="100%" display={started ? 'initial' : 'none'} flex="1">
              <div id="pyramidy-target" />
            </Box>
          </>
        }
      </Stack>
    </Box>
  )
}

export default PlaySpace
