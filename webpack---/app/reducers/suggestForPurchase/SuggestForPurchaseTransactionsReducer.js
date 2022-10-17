import Immutable from 'immutable';
import SuggestForPurchaseConstants from 'app/constants/SuggestForPurchaseConstants';

const initialState = Immutable.Map({ isAdding: false });

export default function suggestForPurchaseTransactions(state = initialState, action) {
  switch (action.type) {
    case SuggestForPurchaseConstants.SUBMIT_LITE_SUGGESTION_FAILURE:
      return initialState;
    case SuggestForPurchaseConstants.SUBMIT_LITE_SUGGESTION_REQUEST:
      return state.merge({
        isAdding: true
      });
    case SuggestForPurchaseConstants.SUBMIT_LITE_SUGGESTION_SUCCESS:
      return state.merge({
        isAdding: false
      });
    default:
      return state;
  }
}
