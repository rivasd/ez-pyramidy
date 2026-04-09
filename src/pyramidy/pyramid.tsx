import Categorie from './categorie';
import { useState } from 'react';
import { getStyles, getGridCss } from '../utils';
import { useGameStore } from '../state';
import PlaySpace from './PlaySpace';

const Pyramid = () => {

    const categories = useGameStore((state) => state.gameDef?.categories || []);
    const [currentCategory, setCurrentCategory] = useState<number | null>(null);
    const stylesArray = getStyles(categories);
    const gridStyles = getGridCss(categories);

    const onClickCategory = (index: number) => {
        setCurrentCategory(index);
    }

    const onEnd = () => {
        setCurrentCategory(null);
    }

    return (
        <div className="pyramidy-main" style={gridStyles}>
            {!currentCategory  ? 
            categories.map( (elem, idx) => (
                <Categorie style={stylesArray[idx] ?? {}} key={idx} order={idx} displayName={elem.displayName} fullName={elem.fullName} onClick={() => onClickCategory(idx)}/>
            ))
            :
                <PlaySpace categoryIdx={currentCategory} onEnd={onEnd} />
            }
        </div>
    )

}

export default Pyramid