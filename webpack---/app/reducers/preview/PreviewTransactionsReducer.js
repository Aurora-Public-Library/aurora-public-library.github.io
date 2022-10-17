import Immutable from 'immutable';
import PreviewConstants from 'app/constants/PreviewConstants';

const initialState = Immutable.Map({});

const updateFeatureName = (featureName, state, newState) =>
  state.merge({
    [featureName]: {
      ...state.get(featureName, {}),
      ...newState
    }
  });

export default function previewTransactions(state = initialState, action) {
  switch (action.type) {
    case PreviewConstants.OPT_IN_REQUEST:
    case PreviewConstants.OPT_OUT_REQUEST:
    case PreviewConstants.SUBMIT_OPT_IN_FEEDBACK_REQUEST:
      return updateFeatureName(action.featureName, state, {
        isLoading: true
      });
    case PreviewConstants.OPT_IN_SUCCESS:
    case PreviewConstants.OPT_OUT_SUCCESS:
    case PreviewConstants.OPT_IN_FAILURE:
    case PreviewConstants.OPT_OUT_FAILURE:
      return updateFeatureName(action.featureName, state, {
        isLoading: false
      });
    case PreviewConstants.SUBMIT_OPT_IN_FEEDBACK_SUCCESS:
      return updateFeatureName(action.featureName, state, {
        isLoading: false
      });
    default:
      return state;
  }
}
