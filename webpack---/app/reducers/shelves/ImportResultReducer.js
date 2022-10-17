import Immutable from 'immutable';
import ShelfConstants from '../../constants/ShelfConstants';

const { IMPORT_ILS_BIBS_REQUEST, IMPORT_ILS_BIBS_SUCCESS, IMPORT_ILS_BIBS_FAILURE } = ShelfConstants;

const initialState = Immutable.Map({
  isFetching: false
});

export default function importResultReducer(state = initialState, action) {
  switch (action.type) {
    case IMPORT_ILS_BIBS_FAILURE: {
      return initialState;
    }

    case IMPORT_ILS_BIBS_REQUEST: {
      return state.set('isFetching', true);
    }

    case IMPORT_ILS_BIBS_SUCCESS: {
      return state.mergeDeep({
        ...action.payload.importResult,
        isFetching: false
      });
    }

    default:
      return state;
  }
}
