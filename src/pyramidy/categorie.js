import React, { Component } from 'react';
import PropType from 'prop-types';
import classNames from 'classnames';
import runWords from '../quiz';



class Categorie extends Component {

    constructor(props){
        super(props);
        this.jsPsychTarget = React.createRef();
        this.play = this.play.bind(this);
        this.state = {
            disabled: false
        }
    }


    play(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            disabled:true
        })

        runWords(this.props.category, this.props.default_time)
    }

    render(){

        var catClass = classNames("pyramidy-categorie",{
            'pyramidy-categorie-disabled': this.state.disabled,
            'pyramidy-categorie-playing': this.props.playing
        })



        return(
            
            <div id={"pyramidy-categorie-"+this.props.order} className={catClass} ref={this.jsPsychTarget} style={this.props.style} onClick={this.play}>
                <span>{this.props.displayName}</span>
            </div>
        )
    }
}

Categorie.defaultProps = {
    disabled: false,
    playing: false,
    displayName: "None",
    fullName: "None"
}

export default Categorie