import Immutable from 'immutable';
import { createSelector } from 'reselect';

const getConfigFromState = state => state.get('app', Immutable.Map());

export const selectAppConfig = createSelector([getConfigFromState], appConfig => appConfig);

export default {
  selectAppConfig
};
