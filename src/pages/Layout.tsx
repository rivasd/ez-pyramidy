import { AppShell, Box, Group, Text, Title } from '@mantine/core';
import { Outlet} from 'react-router-dom';

const Layout = () => {
	return (
		<AppShell
			header={{ height: 72 }}
			padding="md"
		>
			<AppShell.Header>
				<Group h="100%" px="md" justify="space-between" wrap="nowrap">
					<Group gap="sm" wrap="nowrap">
						<Box>
							<Title order={3}>EZ-Pyramidy</Title>
							<Text size="sm">Le systeme de jeu Pyramide FACILE a utiliser</Text>
						</Box>
					</Group>
				</Group>
			</AppShell.Header>
			<AppShell.Main display="flex" w="100%" >
				<Outlet />
			</AppShell.Main>
		</AppShell>
	);
}

export default Layout;