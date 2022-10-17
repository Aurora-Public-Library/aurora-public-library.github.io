import Immutable from 'immutable';
import { combineReducers } from 'redux-immutablejs';

import catalogBib from './CatalogBibReducer';
import manifestations from './ManifestationsReducer';

export default combineReducers(
  Immutable.Map({
    catalogBib,
    manifestations
  })
);
