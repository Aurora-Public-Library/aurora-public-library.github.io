import Immutable from 'immutable';
import VideosConstants from '../../constants/VideosConstants';

const {
  ADD_VIDEO_REQUEST,
  ADD_VIDEO_SUCCESS,
  ADD_VIDEO_FAILURE,
  UPDATE_VIDEO_REQUEST,
  UPDATE_VIDEO_SUCCESS,
  UPDATE_VIDEO_FAILURE,
  REMOVE_VIDEO_REQUEST,
  REMOVE_VIDEO_SUCCESS,
  REMOVE_VIDEO_FAILURE
} = VideosConstants;

const initialState = Immutable.Map();

export default function VideosTransactionsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_VIDEO_REQUEST: {
      return state.mergeIn([action.metadataId], { isAdding: true });
    }

    case UPDATE_VIDEO_REQUEST: {
      return state.mergeIn([action.metadataId, action.videoId], {
        isUpdating: true
      });
    }

    case REMOVE_VIDEO_REQUEST: {
      return state.mergeIn([action.metadataId, action.videoId], {
        isRemoving: true
      });
    }

    case ADD_VIDEO_SUCCESS:
    case ADD_VIDEO_FAILURE:
    case UPDATE_VIDEO_SUCCESS:
    case UPDATE_VIDEO_FAILURE:
    case REMOVE_VIDEO_SUCCESS:
    case REMOVE_VIDEO_FAILURE: {
      return state.delete(action.metadataId);
    }

    default:
      return state;
  }
}
