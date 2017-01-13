/**
 * Created by wrui on 1/12/17.
 */
import fetch from 'isomorphic-fetch';
import * as ActionTypes from './ActionTypes';

// FSA: Flux Standard Action
const action = (type, payload, meta) => ({type, payload, meta});

// try to fetch data from url within a certain time; throw error if time out
const timeoutFetch = (url, opts) =>
   new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('TIMEOUT')), 60000);
      fetch(url, opts).then(resolve, reject);
   });

const fetchJson = (url, opts) => {
   return timeoutFetch(url, opts).then(response => {
      // clone the response and log
      response.clone().text().then(val => {
         console.log(val);
      });

      // success
      if (response.status >= 200 && response.status < 300) {
         return response.json();
      }

      return response.json().then(error => {
         const e = new Error(error);
         e.status = response.status;
         throw e;
      }).catch((error) => {
         const err = error;
         err.status = response.status;
         throw err;
      });
   }).catch(error => {
      const err = error;
      // if timeout happens
      if (err.message === 'TIMEOUT') {
         err.message = 'The request took too long to process.';
      }
      console.error(err);
      throw err;
   });
};

const yql = (woeid) => 'select * from weather.forecast where woeid = ' + woeid;
const url = (woeid) => `https://query.yahooapis.com/v1/public/yql?q=${yql(woeid)}&format=json`;

export const fetchForecastData = (woeid) => action(ActionTypes.FETCH_FORECAST_DATA, fetchJson(url(woeid), {method: 'GET'}));