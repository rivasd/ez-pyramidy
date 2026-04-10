import classNames from 'classnames';
import { useGameStore } from '../state';

interface CategorieProps {
    order: number;
    style: Partial<React.CSSProperties>;
    onClick: () => void;
}

const Categorie = (props: CategorieProps) => {

    const category = useGameStore((state) => state.gameDef?.categories[props.order]);
    const disabled = category?.selectedBy !== undefined

    const catClass = classNames("pyramidy-categorie",{
        'pyramidy-categorie-disabled': disabled
    })


    return(
        
        <div id={"pyramidy-categorie-"+props.order} className={catClass} style={props.style} onClick={props.onClick}>
            <span>{category?.displayName}</span>
        </div>
    )
    
}

Categorie.defaultProps = {
    disabled: false,
    playing: false,
    displayName: "None",
    fullName: "None"
}

export default Categorie