import Immutable from 'immutable';
import BibConstants from 'app/constants/BibConstants';

const { GET_MARC_REQUEST, GET_MARC_SUCCESS, GET_MARC_FAILURE } = BibConstants;

const initialState = Immutable.Map();

export default function MarcFieldsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MARC_REQUEST:
    case GET_MARC_FAILURE: {
      return state;
    }

    case GET_MARC_SUCCESS: {
      return state.merge(action.payload.marcFields);
    }

    default:
      return state;
  }
}
