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
      data: null
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
        var parsed = jsyaml.safeLoad(text);
        self.setState({
          data: parsed.categories
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
        <div id="pyramidy-selector" style={{display: this.state.data === null ? "block" : "none"}}>
          <label htmlFor="source">Selectionner votre jeu</label><br/>
          <input type="file" id="source" name="source" accept=".txt,.yaml,.yml" ref={this.input} onChange={this.loadData}/>
        </div>
          { (() => {
            if(this.state.data === null){
              return
            }
            else{
              return (<Pyramid categories={this.state.data} />)
            }
          })()}
          
      </div>
    );
  }
}

export default App;
