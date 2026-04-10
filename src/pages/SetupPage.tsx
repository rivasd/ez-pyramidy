import { ActionIcon, Button, Center, CloseIcon, FileButton, Group, Stack, Text, TextInput, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../state';
import { useForm } from '@mantine/form';

const SetupPage = () => {
  const loadGameDef = useGameStore((state) => state.loadGameDef);
  const setTeams = useGameStore((state) => state.setTeams);
  const hasCategories = useGameStore((state) => Boolean(state.gameDef?.categories?.length));
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      teams: ['Equipe 1', 'Equipe 2'],
    }
  })

  const onStart = () => {
    const teams = form.values.teams.map(name => ({ name }));
    setTeams(teams);
    navigate('/play');
  }

  const onLoadData = (file: File | null) => {
    if (file) {
      loadGameDef(file);
    }
  };

  return (
    <Center w="100%">
      <Stack>
      <Stack align="center" gap="sm" id="pyramidy-selector" mt="md">
        <Text component="label" htmlFor="source">Sélectionnez votre jeu</Text>
        <FileButton onChange={onLoadData} accept=".txt,.yaml,.yml">
          {(props) => <Button {...props}>Choisir un fichier</Button>}
        </FileButton>
      </Stack>

      {hasCategories && 
      <>
        <Stack align="center" mt="70px">
          <Title order={2}>Configuration des équipes</Title>
          {form.getValues().teams.map((team, idx) =>  (
            <Group key={idx}>
              <Text>Nom de l'équipe {idx + 1}</Text>
              <TextInput {...form.getInputProps(`teams.${idx}`)} />
              <ActionIcon color="red" onClick={() => form.removeListItem('teams', idx)}>
                <CloseIcon />
              </ActionIcon>
            </Group>
          ))}
          <Button onClick={() => form.insertListItem('teams', `Equipe ${form.values.teams.length + 1}`)}>
            Ajouter une équipe
          </Button>
        </Stack>
        <Center mt="100px">
          <Button onClick={onStart} size='lg' m="auto" disabled={form.getValues().teams.length === 0}>
            Démarrer la partie
          </Button>
        </Center>
      </>
      }
      </Stack>
    </Center>
  );
};

export default SetupPage;
