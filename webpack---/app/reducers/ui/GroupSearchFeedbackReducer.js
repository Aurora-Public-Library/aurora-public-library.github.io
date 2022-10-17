import Immutable from 'immutable';
import GroupSearchFeedbackConstants from '../../constants/GroupSearchFeedbackConstants';

const initialState = Immutable.Map({
  metadataId1: null,
  metadataId2: null,
  searchUrl: null,
  shouldMatch: false,
  notes: null,
  groupSearchSummary1: null,
  groupSearchSummary2: null,
  isSubmitting: false,
  isEditing: false
});

export default function itemTransactionReducer(state = initialState, action) {
  switch (action.type) {
    case GroupSearchFeedbackConstants.OPEN_FEEDBACK_OVERLAY:
      return state.merge({
        metadataId1: action.payload.metadataId,
        groupSearchSummary1: action.payload.groupSearchSummary,
        searchUrl: action.payload.searchUrl,
        isEditing: true
      });
    case GroupSearchFeedbackConstants.CLOSE_FEEDBACK_OVERLAY:
      return initialState;

    case GroupSearchFeedbackConstants.SELECT_MATCHING_BIB:
      return state.merge({
        metadataId2: action.payload.metadataId,
        groupSearchSummary2: action.payload.groupSearchSummary
      });

    case GroupSearchFeedbackConstants.CHANGE_MATCHING_BIB:
      return state.merge({
        metadataId2: null,
        groupSearchSummary2: null
      });

    case GroupSearchFeedbackConstants.CHOOSE_SHOULD_MATCH:
      return state.set('shouldMatch', action.payload);

    case GroupSearchFeedbackConstants.SUBMIT_FEEDBACK_REQUEST:
      return state.merge({
        isSubmitting: true,
        notes: action.payload.notes
      });

    case GroupSearchFeedbackConstants.SUBMIT_FEEDBACK_SUCCESS:
      return initialState;
    case GroupSearchFeedbackConstants.SUBMIT_FEEDBACK_FAILURE: {
      const isMissingRequiredFields = action.payload.status === 422;
      if (isMissingRequiredFields) {
        return state.merge({
          isMissingRequiredFields,
          isSubmitting: false
        });
      }
      return state.set('isSubmitting', false);
    }

    default:
      return state;
  }
}
