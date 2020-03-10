import React, { Component } from 'react';
import './App.css';
import { DISHES } from './shared/dishes.js';
import Menu from './components/MenuComponent.js';
import Main from './components/MainComponent';
import { Navbar, NavbarBrand } from 'reactstrap';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }

  render() {
    return (
      
    <BrowserRouter>
      <div className="App">
        <Main />
      </div>
    </BrowserRouter>
    
    );
  }
  
}


  


export default App;


