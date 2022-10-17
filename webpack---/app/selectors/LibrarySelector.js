import Immutable from 'immutable';
import { createSelector } from 'reselect';
import { selectAppConfig } from './AppSelector';
import { selectCurrentAccount, selectAccountsByLibraryId } from './AuthSelector';

export const selectCurrentLibrary = state =>
  state.getIn(['entities', 'libraries', state.getIn(['library', 'id'], '').toString()], Immutable.Map());

export const selectCurrentSite = state =>
  state.getIn(['entities', 'sites', selectCurrentLibrary(state).get('siteId')], Immutable.Map());

const getTerminalBranch = state => state.getIn(['app', 'localBranch']);

export const selectPickupBranches = createSelector(selectCurrentLibrary, library => {
  if (library.get('homeBranchAsPickupLocation')) {
    return Immutable.List();
  }

  return library.get('branches', Immutable.List());
});

export const selectActivePreferredBranches = createSelector(
  selectCurrentAccount,
  selectPickupBranches,
  getTerminalBranch,
  selectCurrentLibrary,
  (account, branches, localBranch, library) => {
    if (library.get('singleBranch') && branches.size === 1) {
      return Immutable.List.of(branches.first());
    }

    const indexedBranches = Immutable.Map(branches.map(branch => [branch.get('code'), branch]));
    const preferredLocations = account ? account.get('preferredLocations', Immutable.List()) : Immutable.List();
    const eligibleLocations = localBranch ? preferredLocations.unshift(localBranch) : preferredLocations;
    return eligibleLocations
      .toSet()
      .toList()
      .map(code => indexedBranches.get(code))
      .filter(branch => !!branch);
  }
);

export const selectLinkedLibrariesById = createSelector(
  [selectCurrentLibrary, selectAccountsByLibraryId],
  (library, accountsByLibraryId) =>
    library
      .get('linkableLibraries', Immutable.List())
      .filter(linkableLibrary => accountsByLibraryId.has(linkableLibrary.get('libraryId')))
      .groupBy(linkableLibrary => linkableLibrary.get('libraryId'))
      .map(libraryList => libraryList.first())
);

export const selectLibraryLinkedData = createSelector([selectCurrentLibrary, selectAppConfig], (library, appConfig) => {
  const cdnHost = appConfig.get(['coreAssets', 'cdnHost'], appConfig.get('baseURL'));
  const imageBaseUrl = `${cdnHost}/images/${library.get('siteId')}`;

  return Immutable.Map({
    '@context': 'http://schema.org',
    '@type': 'Library',
    name: library.get('fullName'),
    url: appConfig.get('baseURL'),
    logo: `${imageBaseUrl}/logo.png`,
    image: `${imageBaseUrl}/logo.png`
  });
});
