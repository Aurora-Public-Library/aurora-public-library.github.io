import Immutable from 'immutable';
import EventsConstants from '../../constants/EventsConstants';
import SearchConstants from '../../constants/SearchConstants';

const DEFAULT_SEARCH_TYPE = 'smart';

const initialState = Immutable.Map({
  searchTerm: null,
  searchType: DEFAULT_SEARCH_TYPE
});

const searchTypeMap = {
  bl: 'smart',
  bkw: 'bkw',
  keyword: 'smart',
  catalogue: 'smart',
  xauthor: 'author',
  xsubject: 'subject',
  composite_heading: 'subject',
  groupkey: 'smart'
};

function isSpecialSearch(type) {
  return ['bl', 'groupkey'].indexOf(type) > -1;
}

function mapSearchType(type) {
  return searchTypeMap[type] || type;
}

export default function searchForm(state = initialState, action) {
  switch (action.type) {
    case EventsConstants.SEARCH_EVENTS_SUCCESS: {
      const { q } = action.query;
      return state.set('searchTerm', q);
    }

    case SearchConstants.SEARCH_SUCCESS:
    case SearchConstants.SHELF_AVAILABILITY_SEARCH_SUCCESS: {
      const { searchType, query } = action.payload.catalogSearch;
      return state.merge({
        searchType: mapSearchType(searchType),
        searchTerm: isSpecialSearch(searchType) ? '' : query
      });
    }

    default:
      return state;
  }
}
