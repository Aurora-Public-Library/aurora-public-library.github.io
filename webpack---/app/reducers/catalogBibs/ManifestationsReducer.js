import Immutable from 'immutable';
import CatalogBibsConstants from 'app/constants/CatalogBibsConstants';

const initialState = Immutable.Map({
  isLoaded: false,
  isFetching: false
});

export default function manifestationsReducer(state = initialState, action) {
  switch (action.type) {
    case CatalogBibsConstants.FETCH_CATALOG_BIB_FAILURE:
      return initialState;

    case CatalogBibsConstants.FETCH_CATALOG_BIB_REQUEST: {
      return state.merge({
        isFetching: true
      });
    }

    case CatalogBibsConstants.FETCH_CATALOG_BIB_SUCCESS: {
      const { catalogBib } = action.payload;
      return state.merge({
        ids: [catalogBib.id, ...catalogBib.manifestations],
        groupKey: catalogBib.groupKey,
        editionsCount: catalogBib.editionsCount,
        isLoaded: true,
        isFetching: false
      });
    }

    default:
      return state;
  }
}
