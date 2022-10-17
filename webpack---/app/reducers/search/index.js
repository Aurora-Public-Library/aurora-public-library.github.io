import Immutable from 'immutable';
import { combineReducers } from 'redux-immutablejs';

import addTitle from './AddTitleReducer';
import catalogSearchOptions from './CatalogSearchOptionsReducer';
import catalogSearch from './CatalogSearchReducer';
import searchForm from './SearchFormReducer';

export default combineReducers(
  Immutable.Map({
    addTitle,
    catalogSearch,
    catalogSearchOptions,
    searchForm
  })
);
