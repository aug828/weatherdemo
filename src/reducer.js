/**
 * Created by wrui on 1/12/17.
 */
import {Map, List, fromJS} from 'immutable';
import * as ActionTypes from './actions/ActionTypes';

export const fetchForecastDataReducer = (state = Map({forecast: List()}), {type, payload, error}) => {
   if (error) {
      console.log(error);
      return state;
   }

   if (type === ActionTypes.FETCH_FORECAST_DATA && payload.query.results) {
      const forecast = payload.query.results.channel.item.forecast;
      return state.merge({forecast: fromJS(forecast)});
   }

   return state;
};
