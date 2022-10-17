import Immutable from 'immutable';
import MoviesConstants from 'app/constants/MoviesConstants';

const initialState = Immutable.fromJS({
  id: null,
  isFetching: false
});

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case MoviesConstants.GET_MOVIE_BY_TITLE_FAILURE:
      return initialState;

    case MoviesConstants.GET_MOVIE_BY_TITLE_REQUEST: {
      return state.merge({
        isFetching: true
      });
    }

    case MoviesConstants.GET_MOVIE_BY_TITLE_SUCCESS: {
      return state.merge({
        ...action.payload,
        isFetching: false
      });
    }

    default:
      return state;
  }
}
