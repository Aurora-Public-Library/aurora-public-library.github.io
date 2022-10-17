import Immutable from 'immutable';
import { createSelector } from 'reselect';

const getBrandingFromState = state => state.get('branding', Immutable.Map());

export const selectBranding = createSelector([getBrandingFromState], branding => branding);

export default {
  selectBranding
};
