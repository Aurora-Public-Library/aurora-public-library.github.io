import Immutable from 'immutable';
import _ from 'lodash';
import HoldsConstants from '../../constants/HoldsConstants';
import AppConstants from '../../constants/AppConstants';
import BorrowingConstants, { BORROWING_VIEW_COOKIE_NAME } from '../../constants/BorrowingConstants';

export const initialState = Immutable.Map({
  fetching: false,
  items: Immutable.List(),
  summary: Immutable.Map(),
  holdsTransactions: Immutable.Map(),
  sortOptions: Immutable.List(),
  pagination: Immutable.Map(),
  holdError: null
});

export default function holds(state = initialState, action) {
  switch (action.type) {
    case AppConstants.INITIALIZE: {
      return state.set('view', action.cookies[BORROWING_VIEW_COOKIE_NAME]);
    }

    case HoldsConstants.FETCH_HOLDS_REQUEST:
      return state.merge({
        fetching: true
      });

    case HoldsConstants.FETCH_HOLDS_SUCCESS: {
      const holdsData = action.payload.borrowing.holds || {};
      return state.set('items', Immutable.fromJS(holdsData.items)).merge({
        summary: action.payload.borrowing.summaries.holds,
        pagination: holdsData.pagination,
        sortOptions: holdsData.sortOptions,
        fetching: false
      });
    }
    case BorrowingConstants.TOGGLE_BORROWING_VIEW:
      return state.merge({ view: action.view });
    case BorrowingConstants.FETCH_SUMMARIES_SUCCESS:
      return state.merge({
        summary: _.get(action, 'payload.borrowing.holds.summary', {})
      });
    case HoldsConstants.CANCEL_HOLD_REQUEST: {
      return state.withMutations(newState => {
        action.holdIds.forEach(id => newState.mergeIn(['holdsTransactions', id], { isCancelling: true }));
      });
    }
    case HoldsConstants.CANCEL_HOLD_SUCCESS:
    case HoldsConstants.CANCEL_HOLD_FAILURE: {
      return state.withMutations(newState => {
        action.holdIds.forEach(id => newState.deleteIn(['holdsTransactions', id, 'isCancelling']));
      });
    }

    case HoldsConstants.UPDATE_HOLDS_EXPIRY_REQUEST: {
      return state.withMutations(newState => {
        action.holdIds.forEach(id =>
          newState.mergeIn(['holdsTransactions', id], {
            isUpdatingExpiryDate: true
          })
        );
      });
    }
    case HoldsConstants.UPDATE_HOLDS_EXPIRY_SUCCESS:
    case HoldsConstants.UPDATE_HOLDS_EXPIRY_FAILURE: {
      return state.withMutations(newState => {
        action.holdIds.forEach(id => newState.deleteIn(['holdsTransactions', id, 'isUpdatingExpiryDate']));
      });
    }

    case HoldsConstants.UPDATE_PAUSE_HOLDS_DATE_REQUEST: {
      return state.withMutations(newState => {
        action.holdIds.forEach(id =>
          newState.mergeIn(['holdsTransactions', id], {
            isUpdatingPauseDate: true
          })
        );
      });
    }
    case HoldsConstants.UPDATE_PAUSE_HOLDS_DATE_SUCCESS:
    case HoldsConstants.UPDATE_PAUSE_HOLDS_DATE_FAILURE: {
      return state.withMutations(newState => {
        action.holdIds.forEach(id => newState.deleteIn(['holdsTransactions', id, 'isUpdatingPauseDate']));
      });
    }

    case HoldsConstants.UPDATE_PAUSE_HOLDS_REQUEST: {
      const key = action.suspended.status ? 'isPausing' : 'isResuming';
      return state.withMutations(newState => {
        action.holdIds.forEach(id => newState.mergeIn(['holdsTransactions', id], { [key]: true }));
      });
    }
    case HoldsConstants.UPDATE_PAUSE_HOLDS_SUCCESS:
    case HoldsConstants.UPDATE_PAUSE_HOLDS_FAILURE: {
      const key = action.suspended.status ? 'isPausing' : 'isResuming';
      return state.withMutations(newState => {
        action.holdIds.forEach(id => newState.deleteIn(['holdsTransactions', id, key]));
      });
    }

    case HoldsConstants.UPDATE_PICKUP_LOCATION_REQUEST: {
      return state.withMutations(newState => {
        newState.mergeIn(['holdsTransactions', action.holdId], {
          isUpdatingPickupLocation: true
        });
      });
    }
    case HoldsConstants.UPDATE_PICKUP_LOCATION_SUCCESS:
    case HoldsConstants.UPDATE_PICKUP_LOCATION_FAILURE: {
      return state.withMutations(newState => {
        newState.deleteIn(['holdsTransactions', action.holdId, 'isUpdatingPickupLocation']);
      });
    }

    case HoldsConstants.PLACE_HOLD_REQUEST: {
      return state.withMutations(newState => {
        newState.set('holdError', null);
        newState.setIn(['holdsTransactions', action.metadataId, 'isPlacingHold'], true);
      });
    }

    case HoldsConstants.PLACE_HOLD_SUCCESS:
    case HoldsConstants.PLACE_HOLD_FAILURE: {
      const actionError = (action.payload && action.payload.error) || null;
      return state.withMutations(newState => {
        newState.merge({ holdError: actionError });
        newState.deleteIn(['holdsTransactions', action.metadataId]);
      });
    }

    case HoldsConstants.OPEN_ITEM_LEVEL_HOLDS: {
      return state.setIn(['holdsTransactions', action.metadataId, 'itemLevelHoldsOpen'], true);
    }

    case HoldsConstants.CLOSE_ITEM_LEVEL_HOLDS: {
      return state.deleteIn(['holdsTransactions', action.metadataId]);
    }

    default:
      return state;
  }
}
