/**
 * Created by wrui on 1/12/17.
 */
import * as ActionTypes from './actions/ActionTypes';
import initialState from './constants/initialState';

export const fetchForecastDataReducer = (state = initialState, {type, payload, error}) => {
   if (error) {
      console.log(error);
      return state;
   }

   if (type === ActionTypes.FETCH_FORECAST_DATA) {
      if (payload.query.results) {
         const {query: {results: {channel: {units, location, wind, item: {forecast, condition}}}}} = payload;
         return state.merge({location, units, condition, wind, forecast});
      }
      return initialState;
   }

   return state;
};
