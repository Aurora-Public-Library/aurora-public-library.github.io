import Immutable from 'immutable';
import { combineReducers } from 'redux-immutablejs';

import libraryError from './LibraryErrorReducer';

export default combineReducers(
  Immutable.Map({
    libraryError
  })
);
