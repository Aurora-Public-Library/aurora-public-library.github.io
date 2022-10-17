import FeedbackConstants from '../constants/FeedbackConstants';
import FeedbackApi from '../api/FeedbackApi';
import composeGlobalSuccessMessaging from '../helpers/messaging/composeGlobalSuccessMessaging';

export function collapseFeedbackBox() {
  return {
    type: FeedbackConstants.COLLAPSE_FEEDBACK
  };
}

export function expandFeedbackBox() {
  return {
    type: FeedbackConstants.EXPAND_FEEDBACK
  };
}

export function updateCategory(category) {
  return {
    type: FeedbackConstants.UPDATE_CATEGORY,
    payload: category
  };
}

export function submitFeedback(feedback) {
  return {
    types: [
      FeedbackConstants.SUBMIT_FEEDBACK_REQUEST,
      FeedbackConstants.SUBMIT_FEEDBACK_SUCCESS,
      FeedbackConstants.SUBMIT_FEEDBACK_FAILURE
    ],
    apiRequest: (state, apiClient) => FeedbackApi.submitFeedback(feedback, apiClient),
    apiSuccess: () => ({
      messaging: composeGlobalSuccessMessaging('message_feedback_confirmed')
    })
  };
}

export default {
  collapseFeedbackBox,
  expandFeedbackBox,
  updateCategory,
  submitFeedback
};
