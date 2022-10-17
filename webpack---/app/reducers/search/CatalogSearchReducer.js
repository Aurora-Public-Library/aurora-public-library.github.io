import Immutable from 'immutable';
import SearchConstants, { SEARCH_VIEW_COOKIE_NAME } from '../../constants/SearchConstants';
import FeaturedContentConstants from '../../constants/FeaturedContentConstants';
import AppConstants from '../../constants/AppConstants';

const DEFAULT_SEARCH_TYPE = 'smart';

const initialState = Immutable.Map({
  isFetching: false,
  pagination: Immutable.Map({
    page: 1,
    pages: 1,
    limit: 25,
    count: 1
  }),
  title: null,
  locked: false,
  broadened: false,
  view: 'grouped',
  broadenedSearchType: null,
  broadenedSearchCount: 0,
  didYouMeanResultCount: 0,
  probes: Immutable.Map(),
  didYouMeanQuerySuggestion: null,
  featuredContent: Immutable.Map(),
  searchType: DEFAULT_SEARCH_TYPE,
  sortBys: Immutable.List(),
  fields: Immutable.List(),
  results: Immutable.List(),
  resultPaneActive: true,
  activeFilters: Immutable.Map(),
  searchTerm: null
});

function updateActiveFilters(state) {
  const activeFilters = state
    .get('fields') // get the fields
    .filter(
      field =>
        !field
          .get('fieldFilters')
          .filter(filter => filter.get('applied') === true)
          .isEmpty()
    ) // only fields that have filters applied
    .map(
      field => [field.get('id'), field.get('fieldFilters').filter(filter => filter.get('applied') === true)] // map the applied filters
    );

  return state.merge({
    isFetching: false,
    activeFilters: Immutable.Map(activeFilters)
  });
}

function updatedField(fields, newField) {
  return fields.update(
    fields.findIndex(field => field.get('id') === newField.id),
    () => Immutable.fromJS({ ...newField, hasMore: true })
  );
}

export default function catalogSearch(state = initialState, action) {
  switch (action.type) {
    case AppConstants.INITIALIZE: {
      return state.set('view', action.cookies[SEARCH_VIEW_COOKIE_NAME] || 'grouped');
    }

    case SearchConstants.SEARCH_FAILURE:
    case SearchConstants.SHELF_AVAILABILITY_SEARCH_FAILURE: {
      return initialState.merge({ zeroResults: true });
    }

    case SearchConstants.TOGGLE_SEARCH_VIEW: {
      return state.merge({ view: action.view });
    }

    case SearchConstants.SEARCH_PROBE_SUCCESS: {
      return state.set('probes', Immutable.Map(action.payload));
    }

    case SearchConstants.SEARCH_REQUEST:
    case SearchConstants.SHELF_AVAILABILITY_SEARCH_REQUEST: {
      const { searchQuery } = action;

      return state.merge({
        isFetching: true,
        featuredContent: Immutable.Map(),
        resultPaneActive: false,
        zeroResults: false,
        query: searchQuery.query,
        shelfName: searchQuery.shelf,
        searchType: searchQuery.searchType
      });
    }

    case SearchConstants.SEARCH_SUCCESS:
    case SearchConstants.SHELF_AVAILABILITY_SEARCH_SUCCESS: {
      const hasNewQuery =
        state.has('query') && state.has('searchTerm') && state.get('query') !== state.get('searchTerm');
      return updateActiveFilters(
        state.merge({
          ...action.payload.catalogSearch,
          title: hasNewQuery ? null : action.payload.catalogSearch.title || state.get('title'),
          title_key: hasNewQuery ? null : action.payload.catalogSearch.title_key || state.get('title_key'),
          searchTerm: action.payload.catalogSearch.query,
          resultPaneActive: true,
          zeroResults: action.payload.catalogSearch.results.length <= 0,
          broadenedSearchType: action.payload.catalogSearch.broadenedSearchType || null,
          rssURL: action.payload.rssURL
        })
      );
    }

    case FeaturedContentConstants.FEATURED_CONTENT_SUCCESS: {
      return state.merge({ featuredContent: action.payload.featuredContent });
    }

    case SearchConstants.EXPAND_FIELD_SUCCESS:
    case SearchConstants.TOGGLE_EXPANDED_FIELD_SUCCESS: {
      return state.set('fields', updatedField(state.get('fields'), action.payload));
    }

    default:
      return state;
  }
}
