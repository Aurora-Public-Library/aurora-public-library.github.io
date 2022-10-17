import { createSelector } from 'reselect';
import Immutable from 'immutable';

import { selectCurrentUser } from './AuthSelector';

const mapAppliedFilters = field => [
  field.get('id'),
  field.get('fieldFilters').filter(filter => filter.get('applied') === true)
];
const filterAppliedFilters = ([fieldId, appliedFilters]) => fieldId && !appliedFilters.isEmpty();
const getShelfSearch = state => state.getIn(['shelves', 'shelfSearch'], Immutable.Map());
const usersSelector = state => state.getIn(['entities', 'users'], Immutable.Map());
const getShelves = state => state.getIn(['entities', 'shelves'], Immutable.Map());
const importResultState = state => state.getIn(['shelves', 'importResult'], Immutable.Map());
const shelfTransactionsState = state => state.getIn(['shelves', 'shelfTransactions'], Immutable.Map());

export const selectActiveShelfFilters = createSelector([getShelfSearch], shelfSearch =>
  Immutable.Map(
    shelfSearch
      .getIn(['shelf', 'facets'])
      .map(mapAppliedFilters)
      .filter(filterAppliedFilters)
  )
);

export const selectShelfOwner = createSelector(
  [getShelfSearch, usersSelector],
  (shelfSearch, users) =>
    users.find(user => user.get('id') === shelfSearch.getIn(['shelf', 'userId'])) || Immutable.Map()
);

export const selectRequestedShelf = createSelector([getShelfSearch, getShelves], (shelfSearch, shelvesByUserId) => {
  const shelfItems = shelvesByUserId.get(`${shelfSearch.getIn(['shelf', 'userId'])}`);
  return shelfSearch.get('shelf', Immutable.Map()).withMutations(newShelf => {
    const mappedItems = newShelf.get('items', Immutable.List()).map(id => shelfItems.get(`${id}`));
    return newShelf.set(
      'items',
      mappedItems.filter(item => !!item)
    );
  });
});

export const selectShelvesForCurrentUser = createSelector([getShelves, selectCurrentUser], (shelvesByUserId, user) => {
  const shelves = user && user.get('id') ? shelvesByUserId.get(`${user.get('id')}`, Immutable.Map()) : Immutable.Map();
  return Immutable.Map(shelves.toList().map(item => [item.get('metadataId'), item]));
});

export const selectShelvesSummary = createSelector([getShelfSearch], shelfSearch =>
  shelfSearch.get('summary', Immutable.Map())
);

export const selectImportResult = createSelector([importResultState], importResult => importResult);

export const selectShelfTransactions = createSelector([shelfTransactionsState], shelfTransactions => shelfTransactions);
