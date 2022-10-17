import Immutable from 'immutable';
import CatalogBibsConstants from 'app/constants/CatalogBibsConstants';

const initialState = Immutable.Map({
  isLoaded: false,
  isFetching: false,
  id: null
});

export default function catalogBibReducer(state = initialState, action) {
  switch (action.type) {
    case CatalogBibsConstants.FETCH_CATALOG_BIB_FAILURE:
      return initialState;

    case CatalogBibsConstants.FETCH_CATALOG_BIB_REQUEST: {
      return state.merge({
        isFetching: true
      });
    }

    case CatalogBibsConstants.FETCH_CATALOG_BIB_SUCCESS: {
      return state.merge({
        ...action.payload.catalogBib,
        isLoaded: true,
        isFetching: false
      });
    }

    default:
      return state;
  }
}
