import React, { Component } from 'react';
import Categorie from './categorie';
import algebra from 'algebra.js';

class Pyramid extends Component {

    constructor(props){
        super(props);
        this.mainFrame = React.createRef();

        this.state = {
            categories : props.categories,
            default_time: props.default_time
        }
    }

    findHeigth(num){
        var formula = algebra.parse("1/2 * x^2 + 1/2 * x - "+num + " = 0"); //By Gauss's equation n(n+1)/2
        return Math.ceil(formula.solveFor("x")[1].valueOf()); // take the ceiling integer part of the positive root
       
    }

    getGridCss(){
        var pyramidHeigth = this.findHeigth(this.state.categories.length);
        var dims = {
            rows: pyramidHeigth,
            cols: pyramidHeigth * 2
        }
        var style =  {
            gridTemplateColumns : ((100 / dims["cols"]).toString()+"% ").repeat(dims["cols"]),
            gridTemplateRows: ((100 / dims["rows"]).toString()+"% ").repeat(dims["rows"]),
        }
        return style;
    }

    findCutoffs(heigth) {
        var cutoffs = []
        for(let i=0; i<heigth; i++){
            if(cutoffs.length === 0){
                cutoffs.push(1);
            }
            else{
                cutoffs.push(cutoffs[cutoffs.length-1]+i);
            }
        }
        return cutoffs
    }

    calculateElemsGridCss(categories) {
        var pyramidHeigth = this.findHeigth(this.state.categories.length)
        var cutoffs = this.findCutoffs(pyramidHeigth);
        var styles = []

        cutoffs.forEach((threshold, row) => {
            var startingCol = pyramidHeigth - row;

            for(let i=0; i<row+1; i++){
                if((threshold+i) > categories.length){
                    break;
                }
                styles.push({
                    gridColumnStart: startingCol+ (i*2),
                    gridColumnEnd: "span 2",
                    gridRowStart:row+1
                })
            }
        })

        return styles;
    }

    

    render() {

        var styles = this.calculateElemsGridCss(this.props.categories)

        return (
            <div className="pyramidy-main" style={this.getGridCss()}>
                {this.state.categories.map( (elem, idx) => (
                    <Categorie style={styles[idx]} key={idx} order={idx} displayName={elem.displayName} fullName={elem.fullName} category={elem} default_time={this.props.default_time}/>
                ))
                }
            </div>
        )
    }
}

export default Pyramid