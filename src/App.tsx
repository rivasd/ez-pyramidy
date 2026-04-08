import Pyramid from './pyramidy/pyramid';
import './App.css'
import { useGameStore } from './state';
import { Button, FileButton } from '@mantine/core';

function App() {

  const gameDef = useGameStore((state) => state.gameDef);
  const loadGameDef = useGameStore((state) => state.loadGameDef);

  const loadData = (file: File|null) => {
    if (file) {
      loadGameDef(file);
    }
  }

  return (
    <div className="App" id="app-container">
      <div id="pyramidy-selector" style={{display: gameDef?.categories ? "none" : "block"}}>
        <label htmlFor="source">Sélectionnez votre jeu</label><br/>
        <FileButton onChange={loadData} accept=".txt,.yaml,.yml">
          {(props) => <Button {...props}>Choisir un fichier</Button>}
        </FileButton>
          
      </div>
        { gameDef?.categories && <Pyramid/> }
        
    </div>
  )
}

export default App
