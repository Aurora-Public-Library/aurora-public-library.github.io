import Immutable from 'immutable';
import { combineReducers } from 'redux-immutablejs';
import movie from './MovieReducer';

export default combineReducers(
  Immutable.Map({
    movie
  })
);
