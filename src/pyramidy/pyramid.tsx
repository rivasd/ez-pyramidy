import Categorie from './categorie';
import { useState } from 'react';
import { getStyles, getGridCss } from '../utils';
import { useGameStore } from '../state';
import PlaySpace from './PlaySpace';
import { Box, type BoxProps } from '@mantine/core';

const Pyramid = (props: BoxProps) => {

    const categories = useGameStore((state) => state.gameDef?.categories || []);
    const playCategory = useGameStore((state) => state.playCategory);
    const advanceToNextTeams = useGameStore((state) => state.advanceToNextTeam);
    const [currentCategory, setCurrentCategory] = useState<number | null>(null);
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
            {currentCategory === null  ? 
            categories.map( (elem, idx) => (
                <Categorie style={stylesArray[idx] ?? {}} key={idx} order={idx} displayName={elem.displayName} fullName={elem.fullName} onClick={() => onClickCategory(idx)}/>
            ))
            :
                <PlaySpace categoryIdx={currentCategory} onEnd={onEnd} />
            }
        </Box>
    )

}

export default Pyramid