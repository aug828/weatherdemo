import React, {Component, PropTypes} from 'react';
import {List} from 'immutable';
import {Column, Table} from 'react-virtualized';
import 'react-virtualized/styles.css';
import {cities} from '../constants/cities';
import {fetchForecastData} from '../actions/actions';

// const sampleForecast = [
//    {
//       "code": "30",
//       "date": "19 Jan 2017",
//       "day": "Thu",
//       "high": "5",
//       "low": "1",
//       "text": "Partly Cloudy"
//    },
//    {
//       "code": "28",
//       "date": "20 Jan 2017",
//       "day": "Fri",
//       "high": "0",
//       "low": "-10",
//       "text": "Mostly Cloudy"
//    }
// ];

const findWoeid = (name) => cities.find(city => city.get('name') === name).get('woeid');

export default class extends Component {
   static propTypes = {
      forecast: PropTypes.instanceOf(List)
   };

   render() {
      const {dispatch, forecast} = this.props;

      return (
         <div className="ForecastSection">
            <label>Choose a city: </label>
            <select onChange={ev => dispatch(fetchForecastData(findWoeid(ev.target.value)))}>
               {cities.map(city => <option key={city.get('woeid')}>{city.get('name')}</option>)}
            </select>
            {forecast && forecast.size > 0 ?
               <Table
                  width={800}
                  height={400}
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
               </Table> : <p>Sorry, Yahoo weather api did not return anything.</p>
            }
         </div>
      );
   }
}

