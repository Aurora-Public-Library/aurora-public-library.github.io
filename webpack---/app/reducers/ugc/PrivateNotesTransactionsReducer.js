import Immutable from 'immutable';
import PrivateNotesConstants from '../../constants/PrivateNotesConstants';

const {
  ADD_PRIVATE_NOTES_REQUEST,
  ADD_PRIVATE_NOTES_SUCCESS,
  ADD_PRIVATE_NOTES_FAILURE,
  UPDATE_PRIVATE_NOTES_REQUEST,
  UPDATE_PRIVATE_NOTES_SUCCESS,
  UPDATE_PRIVATE_NOTES_FAILURE,
  REMOVE_PRIVATE_NOTES_REQUEST,
  REMOVE_PRIVATE_NOTES_SUCCESS,
  REMOVE_PRIVATE_NOTES_FAILURE
} = PrivateNotesConstants;

const initialState = Immutable.Map();

export default function PrivateNotesTransactionsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRIVATE_NOTES_REQUEST: {
      return state.mergeIn([action.metadataId], { isAdding: true });
    }

    case UPDATE_PRIVATE_NOTES_REQUEST: {
      return state.mergeIn([action.metadataId, action.noteId], {
        isUpdating: true
      });
    }

    case REMOVE_PRIVATE_NOTES_REQUEST: {
      return state.mergeIn([action.metadataId, action.noteId], {
        isRemoving: true
      });
    }

    case ADD_PRIVATE_NOTES_SUCCESS:
    case ADD_PRIVATE_NOTES_FAILURE:
    case UPDATE_PRIVATE_NOTES_SUCCESS:
    case UPDATE_PRIVATE_NOTES_FAILURE:
    case REMOVE_PRIVATE_NOTES_SUCCESS:
    case REMOVE_PRIVATE_NOTES_FAILURE: {
      return state.delete(action.metadataId);
    }

    default:
      return state;
  }
}
