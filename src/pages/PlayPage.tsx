import { Navigate } from 'react-router-dom';
import Pyramid from '../pyramidy/Pyramid';
import { useGameStore } from '../state';
import { Flex } from '@mantine/core';
import GameStatus from '../pyramidy/GameStatus';

const PlayPage = () => {
  const hasCategories = useGameStore((state) => Boolean(state.gameDef?.categories?.length));

  if (!hasCategories) {
    return <Navigate to="/setup" replace />;
  }

  return (
    <Flex direction="column" flex="1">
      <Pyramid style={{ flex: 1 }} />
      <GameStatus />
    </Flex>
  );
};

export default PlayPage;
