import Immutable from 'immutable';
import { combineReducers } from 'redux-immutablejs';
import previewFeatures from './PreviewFeaturesReducer';
import previewTransactions from './PreviewTransactionsReducer';

export default combineReducers(
  Immutable.Map({
    previewTransactions,
    previewFeatures
  })
);
