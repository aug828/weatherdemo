import React, {Component} from 'react';
import {connect} from 'react-redux';
import logo from './style/logo.svg';
import Forecast from './components/Forecast';
import './style/App.css';

class App extends Component {
   render() {
      const {location, units, condition, wind, forecast, dispatch} = this.props;

      return (
         <div className="App">
            <div className="App-header">
               <img src={logo} className="App-logo" alt="logo" />
               <h2>Welcome to Weather Forecast Demo</h2>
            </div>
            <Forecast {...{location, units, condition, wind, forecast, dispatch}}/>
         </div>
      );
   }
}

export default connect(state => state.toObject())(App);
