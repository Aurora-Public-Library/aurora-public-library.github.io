import Immutable from 'immutable';
import BibConstants from '../../constants/BibConstants';

const initialState = Immutable.Map();

export default function digitalFormats(state = initialState, action) {
  switch (action.type) {
    case BibConstants.FETCH_DIGITAL_FORMATS_REQUEST: {
      return state.setIn([action.metadataId, 'isFetching'], true);
    }

    case BibConstants.FETCH_DIGITAL_FORMATS_FAILURE: {
      return initialState;
    }

    case BibConstants.FETCH_DIGITAL_FORMATS_SUCCESS:
    case BibConstants.FETCH_AVAILABILITY_SUCCESS: {
      return state.set(
        action.metadataId,
        Immutable.fromJS({
          formats: action.payload.availability.digitalFormats,
          isFetching: false
        })
      );
    }

    default:
      return state;
  }
}
