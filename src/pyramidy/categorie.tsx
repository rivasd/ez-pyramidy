import React from 'react';
import classNames from 'classnames';
import runWords from '../quiz';
import { useGameStore } from '../state';

interface CategorieProps {
    order: number;
    style: Partial<React.CSSProperties>;
}

const Categorie = (props: CategorieProps) => {

    const [playing, setPlaying] = React.useState(false);
    const category = useGameStore((state) => state.gameDef?.categories[props.order]);
    const currentTeam = useGameStore((state) => state.gameDef?.currentTeam);
    const default_time = useGameStore((state) => state.gameDef?.max_time || 0);
    const disabled = category?.selectedBy !== undefined

    const play = (e: React.MouseEvent<HTMLDivElement>) => {
        if(!category || disabled){
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        setPlaying(true);
        runWords(category, default_time)
    }

    const catClass = classNames("pyramidy-categorie",{
        'pyramidy-categorie-disabled': disabled,
        'pyramidy-categorie-playing': playing
    })


    return(
        
        <div id={"pyramidy-categorie-"+props.order} className={catClass} style={props.style} onClick={play}>
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