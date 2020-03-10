import React, { Component } from 'react';
import './App.css';
import { DISHES } from './shared/dishes.js';
import Menu from './components/MenuComponent.js';
import Main from './components/MainComponent';
import { Navbar, NavbarBrand } from 'reactstrap';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }

  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
  
}


  


export default App;


