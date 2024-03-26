import React, { Component } from 'react';
import './App.css';
import Pyramid from './pyramidy/pyramid';
import jsyaml from 'js-yaml';


class App extends Component {

  constructor(props){
    super(props)
    this.input = React.createRef()
    this.loadData = this.loadData.bind(this);
    this.state = {
      categories: null
    }
  }

  loadData(e){
    e.preventDefault();
    var file = this.input.current.files[0];
    var reader = new FileReader();
    var self = this;
    
    reader.onload = function(){
      var text = reader.result
      try {
        var parsed = jsyaml.load(text);
        var max_time = 60;
        if ("max_time" in parsed){
          max_time = parseInt(parsed.max_time)
        };

        self.setState({
          categories: parsed.categories,
          default_time: max_time
        })
      }
      catch (e){
        alert("Oups! there was a problem with your file, check syntax")
      }
    }

    reader.readAsText(file)

  }

  render() {
    return (
      <div className="App" id="app-container">
        <div id="pyramidy-selector" style={{display: this.state.categories === null ? "block" : "none"}}>
          <label htmlFor="source">Sélectionnez votre jeu</label><br/>
          <input type="file" id="source" name="source" accept=".txt,.yaml,.yml" ref={this.input} onChange={this.loadData}/>
        </div>
          { (() => {
            if(this.state.categories === null){
              return ""
            }
            else{
              return (<Pyramid categories={this.state.categories} default_time={this.state.default_time}/>)
            }
          })()}
          
      </div>
    );
  }
}

export default App;
