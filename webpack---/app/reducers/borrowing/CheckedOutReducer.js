import Immutable from 'immutable';
import get from 'lodash/get';
import CheckoutConstants from '../../constants/CheckoutConstants';
import AppConstants from '../../constants/AppConstants';
import BorrowingConstants, { BORROWING_VIEW_COOKIE_NAME } from '../../constants/BorrowingConstants';

const initialState = Immutable.Map({
  items: Immutable.List(),
  pagination: Immutable.Map(),
  summary: Immutable.Map(),
  checkoutTransactions: Immutable.Map(),
  failures: Immutable.Map(),
  fulfilment: Immutable.Map(),
  fetching: false
});

export default function checkedOut(state = initialState, action) {
  let checkoutTransactions;
  let updatedState;

  switch (action.type) {
    case AppConstants.INITIALIZE: {
      return state.set('view', action.cookies[BORROWING_VIEW_COOKIE_NAME]);
    }

    case CheckoutConstants.FETCH_CHECKOUTS_REQUEST:
      return state.merge({
        fetching: true
      });

    case BorrowingConstants.TOGGLE_BORROWING_VIEW:
      return state.merge({ view: action.view });

    case CheckoutConstants.FETCH_CHECKOUTS_SUCCESS:
      return state.merge({
        items: action.payload.borrowing.checkouts.items,
        pagination: action.payload.borrowing.checkouts.pagination,
        summary: action.payload.borrowing.summaries.checkedout,
        fetching: false
      });

    case CheckoutConstants.DIGITAL_CHECKOUT_REQUEST:
      return state.setIn(['checkoutTransactions', action.payload.id, 'isCheckingOut'], true);

    case CheckoutConstants.DIGITAL_CHECKOUT_SUCCESS:
    case CheckoutConstants.DIGITAL_CHECKOUT_FAILURE:
      return state.deleteIn(['checkoutTransactions', action.payload.id, 'isCheckingOut']);

    case CheckoutConstants.RENEW_REQUEST:
      checkoutTransactions = state.get('checkoutTransactions').asMutable();
      action.checkoutIds.forEach(id => checkoutTransactions.setIn([id, 'isRenewing'], true));
      return state.set('checkoutTransactions', checkoutTransactions.asImmutable());

    case CheckoutConstants.RENEW_SUCCESS:
    case CheckoutConstants.RENEW_FAILURE:
      checkoutTransactions = state.get('checkoutTransactions').asMutable();
      action.checkoutIds.forEach(id => checkoutTransactions.deleteIn([id, 'isRenewing']));

      updatedState = state;
      if (action.payload.failures) {
        updatedState = updatedState.setIn(['failures', 'renew'], Immutable.fromJS(action.payload.failures));
      }

      return updatedState.set('checkoutTransactions', checkoutTransactions.asImmutable());

    case BorrowingConstants.FETCH_SUMMARIES_SUCCESS:
      return state.mergeDeep({
        summary: get(action, 'payload.borrowing.checkedout.summary', {})
      });

    case CheckoutConstants.FETCH_CHECKOUTS_FAILURE:
      return state.set('fetching', false);

    case CheckoutConstants.QUICK_RENEW_REQUEST:
      return state.setIn(['checkoutTransactions', 'isQuickRenewing'], true);

    case CheckoutConstants.QUICK_RENEW_SUCCESS:
    case CheckoutConstants.QUICK_RENEW_FAILURE:
      updatedState = state;
      if (action.payload.failures) {
        updatedState = updatedState.setIn(['failures', 'renew'], Immutable.fromJS(action.payload.failures));
      }
      return updatedState.setIn(['checkoutTransactions', 'isQuickRenewing'], false);

    case CheckoutConstants.DIGITAL_FORMAT_LOCK_REQUEST:
      return state.setIn(['checkoutTransactions', action.payload.id, 'isLockingFormat'], true);

    case CheckoutConstants.DIGITAL_FORMAT_LOCK_SUCCESS:
    case CheckoutConstants.DIGITAL_FORMAT_LOCK_FAILURE:
      return state.deleteIn(['checkoutTransactions', action.payload.id, 'isLockingFormat']);

    case CheckoutConstants.DIGITAL_CHECK_IN_REQUEST:
      return state.setIn(['checkoutTransactions', action.payload.id, 'isReturning'], true);

    case CheckoutConstants.DIGITAL_CHECK_IN_SUCCESS:
    case CheckoutConstants.DIGITAL_CHECK_IN_FAILURE:
      return state.deleteIn(['checkoutTransactions', action.payload.id, 'isReturning']);

    case CheckoutConstants.GET_FULFILMENT_REQUEST:
      return state.setIn(['fulfilment', 'fetching'], true);

    case CheckoutConstants.GET_FULFILMENT_SUCCESS:
      return state.merge({
        fetching: false,
        fulfilment: action.payload.borrowing.checkouts.fulfilment
      });

    case CheckoutConstants.GET_FULFILMENT_FAILURE:
      return state.merge({
        fetching: false,
        fulfilment: Immutable.Map()
      });

    default:
      return state;
  }
}
