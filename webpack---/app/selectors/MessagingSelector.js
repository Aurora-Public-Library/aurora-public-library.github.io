import Immutable from 'immutable';
import { createSelector } from 'reselect';
import { GLOBAL_MESSAGING_ID } from '../constants/MessagingConstants';

const getMessagingFromState = state => state.getIn(['ui', 'messaging'], Immutable.Map());

export const selectMessaging = createSelector([getMessagingFromState], messaging => messaging);

export const selectGlobalMessaging = createSelector([selectMessaging], messaging => messaging.get(GLOBAL_MESSAGING_ID));

export default {
  selectMessaging,
  selectGlobalMessaging
};
