import Immutable from 'immutable';
import { createSelector } from 'reselect';

export const selectOpenModals = createSelector([state => state.getIn(['ui', 'modal'], Immutable.Map())], modals =>
  modals.filter(modal => !!modal.get('open'))
);

export default {
  selectOpenModals
};
