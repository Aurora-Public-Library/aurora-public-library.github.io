import Immutable from 'immutable';
import VideosConstants from 'app/constants/VideosConstants';

const { GET_VIDEO_REQUEST, GET_VIDEO_SUCCESS, GET_VIDEO_FAILURE } = VideosConstants;

const initialState = Immutable.Map();

export default function VideoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEO_REQUEST:
    case GET_VIDEO_FAILURE: {
      return state;
    }

    case GET_VIDEO_SUCCESS: {
      return state.merge(action.payload.ugc.video);
    }

    default:
      return state;
  }
}
