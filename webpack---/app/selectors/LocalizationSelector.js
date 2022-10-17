import Immutable from 'immutable';
import { createSelector } from 'reselect';

const getLocalizationFromState = state => state.get('localization', Immutable.Map());

// NOTE: This returns a plain object becuase that's what react-intl expects
export const selectLocalization = createSelector([getLocalizationFromState], localization => localization.toJS());

export default {
  selectLocalization
};
