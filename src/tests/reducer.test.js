import {Map, List} from 'immutable';
import {fetchForecastDataReducer} from '../reducer';
import * as ActionTypes from '../actions/ActionTypes';

it('changes state if receives weather data', () => {
   const oldState = Map({
      forecast: List([
         {
            "code": "30",
            "date": "19 Jan 2017",
            "day": "Thu",
            "high": "5",
            "low": "1",
            "text": "Partly Cloudy"
         }
      ])
   });
   const newState = fetchForecastDataReducer(
      oldState,
      {type: ActionTypes.FETCH_FORECAST_DATA, payload: {query: {results: null}}}
   );

   console.log(newState)
   expect(newState.get('forecast').size).toEqual(0);
});
