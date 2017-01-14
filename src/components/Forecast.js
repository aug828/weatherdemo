import React, {Component, PropTypes} from 'react';
import {Map, List} from 'immutable';
import {Column, Table} from 'react-virtualized';
import 'react-virtualized/styles.css';
import {cities} from '../constants/cities';
import {fetchForecastData} from '../actions/actions';

// check sampleData.json to see the structure

class Summary extends Component {
   render() {
      const {location, units, condition} = this.props;

      return (
         <div className="summary">
            {location.get('city') && location.get('region') ? <span>City: {location.get('city')}, {location.get('region')}</span> : null}
            <br/>
            {condition.get('temp') && units.get('temperature') ? <span>Temperature: {condition.get('temp') + units.get('temperature')}</span> : null}
            <br/>
            {condition.get('code') ? <img src={`http://l.yimg.com/a/i/us/we/52/${condition.get('code')}.gif`} alt='weather condition'/> : null}
         </div>
      )
   }
}

export default class extends Component {
   static propTypes = {
      location: PropTypes.instanceOf(Map),
      units: PropTypes.instanceOf(Map),
      condition: PropTypes.instanceOf(Map),
      wind: PropTypes.instanceOf(Map),
      forecast: PropTypes.instanceOf(List)
   };

   render() {
      const {dispatch, location, units, condition, forecast} = this.props;

      return (
         <div className="ForecastSection">
            <div className="selectCity">
               <label><b>Choose a city: </b></label>
               <select onChange={ev => dispatch(fetchForecastData(ev.target.value))}>
                  {cities.map(city => <option key={city.get('woeid')} value={city.get('woeid')}>{city.get('name')}</option>)}
               </select>
            </div>

            <Summary {...{location, condition, units}}/>

            <div className="forecast">
               {forecast && forecast.size > 0 ?
                  <Table
                     width={800}
                     height={350}
                     headerHeight={20}
                     rowHeight={30}
                     rowCount={forecast.size}
                     rowGetter={({index}) => forecast.get(index).toJS()}
                  >
                     <Column label='Date' dataKey='date' width={200}/>
                     <Column label='Day' dataKey='day' width={100}/>
                     <Column label='High' dataKey='high' width={100}/>
                     <Column label='Low' dataKey='low' width={100}/>
                     <Column label='Description' dataKey='text' width={300}/>
                  </Table> : <p>Sorry, Yahoo weather api is in a cranky mood.</p>
               }
            </div>
         </div>
      );
   }
}

