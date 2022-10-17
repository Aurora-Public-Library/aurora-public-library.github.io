import Immutable from 'immutable';
import FeatureTogglzConstants from '../constants/FeatureTogglzConstants';

const initialState = Immutable.Map();

export default function featureTogglz(state = initialState, action) {
  switch (action.type) {
    case FeatureTogglzConstants.GET_FEATURES_SUCCESS: {
      return state.set('features', action.payload.features);
    }

    default:
      return state;
  }
}
