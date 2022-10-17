import Immutable from 'immutable';
import { createSelector } from 'reselect';
import { selectCurrentUser } from '../AuthSelector';

const byUserId = content => content.get('userId');
const byMetadataId = content => content.get('metadataId');
const byId = content => content.get('id');

const getUGCByTypeFromState = ugcType => state => state.getIn(['entities', 'ugc', ugcType], Immutable.Map());

/*
 * Exports
 */
export const selectUGCByType = ugcType => createSelector([getUGCByTypeFromState(ugcType)], ugc => ugc);

export const selectUGCListByUsers = ugcType =>
  createSelector([selectUGCByType(ugcType)], ugc =>
    ugc.groupBy(byUserId).map(groupedUGC =>
      groupedUGC
        .toList()
        .sortBy(byId)
        .groupBy(byMetadataId)
    )
  );

export const selectSingularUGCByUsers = ugcType =>
  createSelector([selectUGCListByUsers(ugcType)], ugcListByUser =>
    ugcListByUser.map(ugcListByMetadataId => ugcListByMetadataId.map(ugcList => ugcList.first()))
  );

export const selectUGCByBibs = ugcType =>
  createSelector([selectUGCByType(ugcType)], ugc =>
    ugc.groupBy(byMetadataId).map(groupedUGC => groupedUGC.toList().sortBy(byId))
  );

export const selectUGCListForCurrentUser = ugcType =>
  createSelector([selectUGCListByUsers(ugcType), selectCurrentUser], (ugc, user) =>
    user && user.get('id') ? ugc.get(user.get('id'), Immutable.Map()) : Immutable.Map()
  );

export const selectSingularUGCForCurrentUser = ugcType =>
  createSelector([selectSingularUGCByUsers(ugcType), selectCurrentUser], (ugc, user) =>
    user && user.get('id') ? ugc.get(user.get('id'), Immutable.Map()) : Immutable.Map()
  );

export default {
  selectUGCByType,
  selectUGCListByUsers,
  selectUGCByBibs,
  selectUGCListForCurrentUser
};
