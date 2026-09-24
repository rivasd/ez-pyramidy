import Categorie from './categorie';
import { useMemo, useState } from 'react';
import { getStyles, getGridCss, shuffle } from '../utils';
import { useGameStore } from '../state';
import PlaySpace from './PlaySpace';
import { Box, type BoxProps } from '@mantine/core';
import syles from '../styles/Pyramid.module.css';

const Pyramid = (props: BoxProps) => {

    const categories = useGameStore((state) => state.gameDef?.categories || []);
    const gameImgUrl = useGameStore((state) => state.gameDef?.gameImgUrl);
    const playCategory = useGameStore((state) => state.playCategory);
    const advanceToNextTeams = useGameStore((state) => state.advanceToNextTeam);
    const [currentCategory, setCurrentCategory] = useState<number | null>(null);
    // shuffle once per loaded game, not on every state update (e.g. selectedBy/words changes)
    const categoryKey = categories.map((c) => c.fullName).join('|');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const displayOrder = useMemo(() => shuffle(categories.map((_, idx) => idx)), [categoryKey]);
    const stylesArray = getStyles(categories);
    const gridStyles = getGridCss(categories);

    const onClickCategory = (index: number) => {
        setCurrentCategory(index);
        playCategory(index);
    }

    const onEnd = () => {
        setCurrentCategory(null);
        advanceToNextTeams();
    }

    return (
        <Box className="pyramidy-main" style={gridStyles} {...props}>
            {gameImgUrl && <img src={gameImgUrl} alt="Game" className={syles.gameImg}/>}
            {gameImgUrl && <img src={gameImgUrl} alt="Game" className={syles.gameImg}/>}
            {currentCategory === null  ? 
            displayOrder.map( (originalIdx, displayIdx) => (
                // Categorie looks its data up in the store by `order`, so it must stay the original index
                <Categorie style={stylesArray[displayIdx] ?? {}} key={originalIdx} order={originalIdx} onClick={() => onClickCategory(originalIdx)}/>
            ))
            
            :
                <PlaySpace categoryIdx={currentCategory} onEnd={onEnd} />
            }
        </Box>
    )

}

export default Pyramid