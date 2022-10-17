import Immutable from 'immutable';
import { combineReducers } from 'redux-immutablejs';

import cardSearch from './CardSearchReducer';

export default combineReducers(
  Immutable.Map({
    cardSearch
  })
);
