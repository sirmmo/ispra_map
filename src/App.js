import React, { Component } from 'react';
import './App.css';
import IspraMap from './IspraMap';
import loadJson from './reducers';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Mappa Ispra</h1>
        </header>
        <IspraMap ref="mappa1" ident="map" center={[-94.1801, 15.2736]} zoom="18"></IspraMap>
        
      </div>
    );
  }

  componentDidMount(){
    loadJson("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson", this.refs.mappa1);
  }

  
}

export default App;

