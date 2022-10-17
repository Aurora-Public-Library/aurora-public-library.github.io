import Immutable from 'immutable';
import RecommendationConstants from '../constants/RecommendationConstants';

const initialState = Immutable.Map({});

export default function recommendation(state = initialState, action) {
  switch (action.type) {
    case RecommendationConstants.RECOMMENDATION_REQUEST: {
      return state.set(action.id, {
        loaded: false,
        zeroResults: true
      });
    }

    case RecommendationConstants.RECOMMENDATION_SUCCESS: {
      return state.set(action.id, {
        ...action.payload,
        loaded: true,
        zeroResults: action.payload.recommendations.length === 0
      });
    }

    case RecommendationConstants.RECOMMENDATION_ERROR: {
      return state.set(action.id, {
        recommendations: Immutable.List(),
        loaded: true,
        type: null,
        zeroResults: true
      });
    }

    default:
      return state;
  }
}
