import Immutable from 'immutable';
import { combineReducers } from 'redux-immutablejs';

import eventsSearch from './EventsSearchReducer';

export default combineReducers(
  Immutable.Map({
    eventsSearch
  })
);
