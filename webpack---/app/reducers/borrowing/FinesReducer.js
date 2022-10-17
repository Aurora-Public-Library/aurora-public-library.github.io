import Immutable from 'immutable';
import _ from 'lodash';
import FinesConstants from 'app/constants/FinesConstants';
import BorrowingConstants from 'app/constants/BorrowingConstants';

const {
  FETCH_FINES_REQUEST,
  FETCH_FINES_SUCCESS,
  FETCH_FINES_FAILURE,
  FETCH_FINES_PAYMENT_FORM_SUCCESS,
  FETCH_FINES_PAYMENT_FORM_FAILURE,
  UPDATE_PAGE_REQUEST,
  UPDATE_PAGE_SUCCESS,
  UPDATE_PAGE_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_FAILURE,
  CLEAR_FINES_TRANSACTION
} = FinesConstants;

const initialState = Immutable.fromJS({
  results: [],
  isFetching: false,
  order: null,
  payment: null
});

export default function finesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FINES_SUCCESS: {
      return state
        .mergeDeep(action.payload.borrowing.fines)
        .set('results', Immutable.fromJS(action.payload.borrowing.fines.results))
        .set('isFetching', false);
    }

    case FETCH_FINES_PAYMENT_FORM_SUCCESS:
    case FETCH_FINES_PAYMENT_FORM_FAILURE: {
      return state.mergeDeep(action.payload.borrowing).set('isFetching', false);
    }

    case FETCH_FINES_REQUEST:
    case UPDATE_PAGE_REQUEST: {
      return state.set('isFetching', true);
    }

    case UPDATE_PAGE_SUCCESS: {
      return state
        .mergeDeep(action.payload.borrowing)
        .set('results', Immutable.fromJS(action.payload.borrowing.fines.results))
        .set('isFetching', false);
    }

    case FETCH_FINES_FAILURE:
    case UPDATE_PAGE_FAILURE: {
      return state.set('isFetching', false);
    }

    case BorrowingConstants.FETCH_SUMMARIES_SUCCESS: {
      return state.mergeDeep(_.get(action, 'payload.borrowing', {}));
    }

    // Paypal Order
    case CREATE_ORDER_FAILURE: {
      return state.merge({
        order: {
          settingUpTransaction: false
        }
      });
    }

    case CREATE_ORDER_REQUEST: {
      return state.merge({
        order: {
          settingUpTransaction: true
        }
      });
    }

    case CREATE_ORDER_SUCCESS: {
      return state.merge({
        order: {
          ...action.payload.borrowing.fines.order,
          settingUpTransaction: false
        }
      });
    }

    // Paypal Payment
    case CREATE_PAYMENT_FAILURE: {
      return state.merge({
        payment: {
          approvingTransaction: false
        }
      });
    }

    case CREATE_PAYMENT_REQUEST: {
      return state.merge({
        payment: {
          approvingTransaction: true
        }
      });
    }

    case CREATE_PAYMENT_SUCCESS: {
      return state.merge({
        payment: {
          ...action.payload.borrowing.fines.payment,
          approvingTransaction: false
        }
      });
    }

    case CLEAR_FINES_TRANSACTION: {
      return state.withMutations(newState => {
        newState.delete('order');
        newState.delete('payment');
      });
    }

    default:
      return state;
  }
}
