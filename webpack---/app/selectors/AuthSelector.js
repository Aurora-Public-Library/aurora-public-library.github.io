import Immutable from 'immutable';
import { createSelector } from 'reselect';

const currentUserIdSelector = state => state.getIn(['auth', 'currentUserId']);
const usersSelector = state => state.getIn(['entities', 'users'], Immutable.Map());
const accountsSelector = state => state.getIn(['entities', 'accounts'], Immutable.Map());
const libraryIdSelector = state => state.getIn(['library', 'id']);

export const selectCurrentUser = createSelector(currentUserIdSelector, usersSelector, (currentUserId, users) =>
  users.find(user => user.get('id') === currentUserId)
);

export const selectCurrentAccount = createSelector(
  selectCurrentUser,
  accountsSelector,
  libraryIdSelector,
  (user, accounts, libId) =>
    user && accounts.find(value => user.get('accounts').includes(value.get('id')) && value.get('libId') === libId)
);

export const selectAccountsByLibraryId = createSelector([accountsSelector], accounts =>
  accounts
    .toList()
    .groupBy(account => account.get('libId'))
    .map(accountsList => accountsList.first())
);

export default {
  selectCurrentUser,
  selectCurrentAccount,
  selectAccountsByLibraryId
};
