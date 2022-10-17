import Immutable from 'immutable';
import QuotationsConstants from 'app/constants/QuotationsConstants';

const { GET_QUOTATION_REQUEST, GET_QUOTATION_SUCCESS, GET_QUOTATION_FAILURE } = QuotationsConstants;

const initialState = Immutable.Map();

export default function QuotationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_QUOTATION_REQUEST:
    case GET_QUOTATION_FAILURE: {
      return initialState;
    }

    case GET_QUOTATION_SUCCESS: {
      return state.merge(action.payload.ugc.quotation);
    }

    default:
      return state;
  }
}
