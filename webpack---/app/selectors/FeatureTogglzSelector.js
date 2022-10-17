import Immutable from 'immutable';
import values from 'lodash/values';
import { TOGGLZ_FEATURES } from '@bibliocommons/constants-feature-togglz';
import { createSelector } from 'reselect';

const featureNames = values(TOGGLZ_FEATURES);
const featuresByName = state => state.getIn(['entities', 'features'], Immutable.Map());
const featureOverrides = state => state.getIn(['app', 'featureOverrides'], Immutable.Map());

export const selectFeatureStatuses = createSelector(featuresByName, featureOverrides, (features, overrides) =>
  featureNames.reduce((result, featureName) => {
    const override = overrides.get(featureName);
    const featureStatus = override !== undefined ? override === 'true' : features.getIn([featureName, 'active'], false);
    return result.set(featureName, featureStatus);
  }, Immutable.Map())
);

export default {
  selectFeatureStatuses
};
