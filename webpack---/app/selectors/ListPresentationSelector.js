import { createSelector } from 'reselect';

const getCurrentViewFromState = state => state.getIn(['ui', 'listPresentation', 'view']);

export const selectCurrentView = createSelector(getCurrentViewFromState, currentView => currentView);

export default {
  selectCurrentView
};
