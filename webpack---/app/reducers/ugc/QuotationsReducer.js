import Immutable from 'immutable';
import QuotationsConstants from 'app/constants/QuotationsConstants';

const { GET_QUOTATIONS_REQUEST, GET_QUOTATIONS_SUCCESS, GET_QUOTATIONS_FAILURE } = QuotationsConstants;

const initialState = Immutable.Map({
  isFetching: false
});

export default function QuotationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_QUOTATIONS_REQUEST: {
      return state.set('isFetching', true);
    }
    case GET_QUOTATIONS_FAILURE: {
      return state.set('isFetching', false);
    }

    case GET_QUOTATIONS_SUCCESS: {
      return state.merge({ ...action.payload.ugc.quotations, isFetching: false });
    }

    default:
      return state;
  }
}
