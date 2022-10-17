import SearchConstants from '../../constants/SearchConstants';
import ShelfConstants from '../../constants/ShelfConstants';

const initialState = false;

export default function ProgressBarReducer(state = initialState, action) {
  switch (action.type) {
    case SearchConstants.SEARCH_REQUEST:
    case SearchConstants.SHELF_AVAILABILITY_SEARCH_REQUEST:
    case SearchConstants.EXPAND_FIELD_REQUEST:
    case ShelfConstants.SHELF_SEARCH_REQUEST:
    case ShelfConstants.FETCH_FILTERS_REQUEST:
      return true;
    case SearchConstants.SEARCH_SUCCESS:
    case SearchConstants.SEARCH_FAILURE:
    case SearchConstants.SHELF_AVAILABILITY_SEARCH_SUCCESS:
    case SearchConstants.SHELF_AVAILABILITY_SEARCH_FAILURE:
    case SearchConstants.EXPAND_FIELD_SUCCESS:
    case SearchConstants.EXPAND_FIELD_FAILURE:
    case SearchConstants.TOGGLE_EXPANDED_FIELD_SUCCESS:
    case SearchConstants.TOGGLE_EXPANDED_FIELD_FAILURE:
    case ShelfConstants.SHELF_SEARCH_SUCCESS:
    case ShelfConstants.SHELF_SEARCH_FAILURE:
    case ShelfConstants.FETCH_FILTERS_SUCCESS:
    case ShelfConstants.FETCH_FILTERS_FAILURE:
      return false;
    default:
      return state;
  }
}
