import { Container, Group, Text } from "@mantine/core";
import { useMemo } from "react";
import { useGameStore } from "../state";
import styles from "../styles/GameStatus.module.css";


const GameStatus = () => {

  const currentTeam = useGameStore((state) => state.currentTeam);
  const teams = useGameStore((state) => state.teams);
  const categories = useGameStore((state) => state.gameDef?.categories);

  const scores = useMemo(() => {
    return categories?.reduce((acc, cat) => {
      if (cat.selectedBy !== undefined) {
        const teamName = teams[cat.selectedBy].name;
        const catScore = cat.words.reduce((s, w) => s + (w.success ? 1 : 0), 0);
        acc[teamName] = (acc[teamName] || 0) + catScore;
      }
      return acc;
    }, {} as Record<string, number>);
  }, [categories, teams]);

  return (
    <Container fluid>
      <Group>
        {teams.map((team, idx) => (
          <Group key={idx}>
            <Text data-current={currentTeam === idx} className={styles.teamScore}>
              {team.name}: {scores ? scores[team.name] || 0 : 0} points
            </Text>
          </Group>
        ))}
      </Group>
    </Container>
  )
}

export default GameStatus;