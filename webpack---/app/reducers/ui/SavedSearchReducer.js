import Immutable from 'immutable';
import SavedSearchConstants from '../../constants/SavedSearchConstants';

const initialState = Immutable.Map({
  isSaving: false,
  isDuplicate: false,
  lastNameAttempt: null,
  duplicateSearchId: null,
  fieldErrors: null
});

export default function SavedSearchReducer(state = initialState, action) {
  switch (action.type) {
    case SavedSearchConstants.SAVE_REQUEST:
      return state.merge({
        isSaving: true,
        isDuplicate: false,
        fieldErrors: undefined,
        lastNameAttempt: action.payload.name
      });
    case SavedSearchConstants.REPLACE_SAVE_REQUEST:
      return state.merge({
        isSaving: true,
        isDuplicate: true,
        fieldErrors: undefined,
        lastNameAttempt: state.get('lastNameAttempt')
      });
    case SavedSearchConstants.REPLACE_SAVE_SEARCH_SUCCESS:
    case SavedSearchConstants.SAVE_SUCCESS:
      return initialState;
    case SavedSearchConstants.REPLACE_SAVE_SEARCH_FAILURE:
    case SavedSearchConstants.SAVE_FAILURE: {
      const { status, error } = action.payload;
      return state.merge({
        isDuplicate: status === 409,
        duplicateSearchId: error && error.meta && error.meta.searchId,
        fieldErrors: error.fieldErrors && Immutable.fromJS(error.fieldErrors),
        isSaving: false
      });
    }
    case SavedSearchConstants.CHOOSE_NEW_NAME:
      return state.set('isDuplicate', false);
    default:
      return state;
  }
}
