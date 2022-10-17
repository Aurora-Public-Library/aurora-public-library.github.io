import Immutable from 'immutable';
import AppConstants from 'app/constants/AppConstants';

const initialState = Immutable.Map({
  nerf_bib_page: false
});

export default function previewFeatures(state = initialState, action) {
  switch (action.type) {
    case AppConstants.INITIALIZE: {
      return state.map((val, key) => action.cookies[`opt_in_feature_${key}`] === 'true');
    }

    default:
      return state;
  }
}
