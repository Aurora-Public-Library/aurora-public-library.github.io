import Immutable from 'immutable';
import AppConstants from '../../constants/AppConstants';
import SearchConstants from '../../constants/SearchConstants';

const initialState = Immutable.Map({
  showGroupings: false
});

const GROUPING_COOKIE = 'catalog_search_show_groupings';
const isTrue = val => /^true$/i.test(val);

export default function catalogSearchOptions(state = initialState, action) {
  switch (action.type) {
    case AppConstants.INITIALIZE: {
      return state.set('showGroupings', isTrue(action.cookies[GROUPING_COOKIE]));
    }

    case SearchConstants.TOGGLE_SHOW_GROUPINGS: {
      const showGroupings = !state.get('showGroupings');
      return state.set('showGroupings', showGroupings);
    }

    default:
      return state;
  }
}
