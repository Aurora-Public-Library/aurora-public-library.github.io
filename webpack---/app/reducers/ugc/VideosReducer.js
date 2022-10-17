import Immutable from 'immutable';
import VideosConstants from 'app/constants/VideosConstants';

const { GET_VIDEOS_REQUEST, GET_VIDEOS_SUCCESS, GET_VIDEOS_FAILURE } = VideosConstants;

const initialState = Immutable.Map({
  isFetching: false
});

export default function VideosReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOS_REQUEST: {
      return state.set('isFetching', true);
    }
    case GET_VIDEOS_FAILURE: {
      return state.set('isFetching', false);
    }

    case GET_VIDEOS_SUCCESS: {
      return state.merge({ ...action.payload.ugc.videos, isFetching: false });
    }

    default:
      return state;
  }
}
