import Categorie from './categorie';
import { getStyles, getGridCss } from '../utils';
import { useGameStore } from '../state';

const Pyramid = () => {

    const categories = useGameStore((state) => state.gameDef?.categories || []);
    const stylesArray = getStyles(categories);
    const gridStyles = getGridCss(categories);

    return (
        <div className="pyramidy-main" style={gridStyles}>
            {categories.map( (elem, idx) => (
                <Categorie style={stylesArray[idx] ?? {}} key={idx} order={idx} displayName={elem.displayName} fullName={elem.fullName}/>
            ))
            }
        </div>
    )

}

export default Pyramid