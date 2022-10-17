import Immutable from 'immutable';
import SeriesInfoConstants from 'app/constants/SeriesInfoConstants';

const initialState = Immutable.Map({
  isLoaded: false,
  isFetching: false,
  id: null
});

export default function SeriesInfoReducer(state = initialState, action) {
  switch (action.type) {
    case SeriesInfoConstants.FETCH_SAME_SERIES_FAILURE:
      return initialState;

    case SeriesInfoConstants.FETCH_SAME_SERIES_REQUEST: {
      return state.merge({
        isFetching: true
      });
    }

    case SeriesInfoConstants.FETCH_SAME_SERIES_SUCCESS: {
      return state.merge({
        ...action.payload.seriesInfo,
        isLoaded: true,
        isFetching: false
      });
    }

    default:
      return state;
  }
}
