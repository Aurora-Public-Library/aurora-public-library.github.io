import Immutable from 'immutable';
import { combineReducers } from 'redux-immutablejs';

import availability from './AvailabilityReducer';
import digitalFormats from './DigitalFormatsReducer';
import userTransactions from './UserTransactionsReducer';
import discovery from './DiscoveryReducer';
import evaluation from './EvaluationReducer';
import ugc from './UgcReducer';
import seriesInfo from './SeriesInfoReducer';
import holdableItems from './HoldableItemsReducer';
import marcFields from './MarcFieldsReducer';
import reviews from './ReviewsReducer';
import recommendations from './RecommendationsReducer';

export default combineReducers(
  Immutable.Map({
    availability,
    digitalFormats,
    userTransactions,
    discovery,
    evaluation,
    ugc,
    seriesInfo,
    holdableItems,
    marcFields,
    reviews,
    recommendations
  })
);
