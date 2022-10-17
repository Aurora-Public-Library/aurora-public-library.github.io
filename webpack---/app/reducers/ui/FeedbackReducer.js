import Immutable from 'immutable';
import FeedbackConstants from '../../constants/FeedbackConstants';

const initialState = Immutable.Map({
  isSubmitting: false,
  expanded: false,
  category: null
});

export default function feedback(state = initialState, action) {
  switch (action.type) {
    case FeedbackConstants.EXPAND_FEEDBACK:
      return state.set('expanded', true);
    case FeedbackConstants.COLLAPSE_FEEDBACK:
      return state.set('expanded', false);
    case FeedbackConstants.UPDATE_CATEGORY:
      return state.set('category', action.payload);
    case FeedbackConstants.SUBMIT_FEEDBACK_REQUEST:
      return state.set('isSubmitting', true);
    case FeedbackConstants.SUBMIT_FEEDBACK_SUCCESS:
    case FeedbackConstants.SUBMIT_FEEDBACK_FAILURE:
      return state.merge({
        isSubmitting: false,
        expanded: action.type === FeedbackConstants.SUBMIT_FEEDBACK_FAILURE
      });
    default:
      return state;
  }
}
