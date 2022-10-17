import Immutable from 'immutable';
import AnalyticsConstants from '../constants/AnalyticsConstants';

const initialState = Immutable.Map();

export default function analytics(state = initialState, action) {
  switch (action.type) {
    case AnalyticsConstants.FETCH_DATALAYER_SUCCESS: {
      return state.merge({ siteDataLayer: action.payload });
    }

    case AnalyticsConstants.SET_CONTEXT: {
      const { contextName, context } = action;
      return state.setIn(['context', contextName], context);
    }

    default:
      return state;
  }
}
