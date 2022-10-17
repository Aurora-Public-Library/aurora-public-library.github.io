import Immutable from 'immutable';
import { combineReducers } from 'redux-immutablejs';

import locationsSearch from './LocationsSearchReducer';

export default combineReducers(
  Immutable.Map({
    locationsSearch
  })
);
