import { AppShell, Box, Burger, Button, FileButton, Group, NavLink, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavLink as RouterNavLink, Outlet, useNavigate } from 'react-router-dom';
import { useGameStore } from '../state';

const Layout = () => {
	const [opened, { toggle }] = useDisclosure(true);
	const navigate = useNavigate();
	const hasGame = useGameStore((state) => Boolean(state.gameDef?.categories?.length));
	const loadGameDef = useGameStore((state) => state.loadGameDef);
	const resetGame = useGameStore((state) => state.resetGame);

	const onLoadData = (file: File | null) => {
		if (file) {
			loadGameDef(file);
			navigate('/play');
		}
	};

	const onReset = () => {
		resetGame();
		navigate('/setup');
	};

	return (
		<AppShell
			header={{ height: 72 }}
			navbar={{
				width: 320,
				breakpoint: 'sm',
				collapsed: { desktop: !opened, mobile: true },
			}}
			padding="md"
		>
			<AppShell.Header>
				<Group h="100%" px="md" justify="space-between" wrap="nowrap">
					<Group gap="sm" wrap="nowrap">
						<Burger opened={opened} onClick={toggle} size="sm" aria-label="Afficher ou masquer la barre latérale" />
						<Box>
							<Title order={3}>EZ-Pyramidy</Title>
							<Text size="sm">Le systeme de jeu Pyramide FACILE a utiliser</Text>
						</Box>
					</Group>
				</Group>
			</AppShell.Header>

			<AppShell.Navbar p="md">
				<Stack gap="md" h="100%" justify="space-between">
					<Stack gap="xs">
						<NavLink component={RouterNavLink} to="/setup" label="Configuration" />
						<NavLink component={RouterNavLink} to="/play" label="Jeu" disabled={!hasGame} />
					</Stack>

					<Stack gap="xs">
						<FileButton onChange={onLoadData} accept=".txt,.yaml,.yml">
							{(props) => <Button fullWidth {...props}>Charger un fichier</Button>}
						</FileButton>
						<Button fullWidth variant="light" onClick={onReset} disabled={!hasGame}>
							Reinitialiser la partie
						</Button>
					</Stack>
				</Stack>
			</AppShell.Navbar>

			<AppShell.Main display="flex" w="100%" >
				<Outlet />
			</AppShell.Main>
		</AppShell>
	);
}

export default Layout;