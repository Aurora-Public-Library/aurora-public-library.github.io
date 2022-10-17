import Immutable from 'immutable';
import _ from 'lodash';
import CheckoutConstants from '../../constants/CheckoutConstants';
import HoldsConstants from '../../constants/HoldsConstants';

const {
  PLACE_HOLD_REQUEST,
  PLACE_HOLD_SUCCESS,
  PLACE_HOLD_FAILURE,
  CANCEL_HOLD_REQUEST,
  CANCEL_HOLD_SUCCESS,
  CANCEL_HOLD_FAILURE,
  UPDATE_PICKUP_LOCATION,
  UPDATE_PAUSE_HOLDS_REQUEST,
  UPDATE_PAUSE_HOLDS_SUCCESS,
  UPDATE_PAUSE_HOLDS_FAILURE
} = HoldsConstants;

const {
  DIGITAL_CHECKOUT_REQUEST,
  DIGITAL_CHECKOUT_SUCCESS,
  DIGITAL_CHECKOUT_FAILURE,
  DIGITAL_FORMAT_LOCK_REQUEST,
  DIGITAL_FORMAT_LOCK_SUCCESS,
  DIGITAL_FORMAT_LOCK_FAILURE
} = CheckoutConstants;

const initialState = Immutable.Map();

export default function itemTransactionReducer(state = initialState, action) {
  switch (action.type) {
    case PLACE_HOLD_REQUEST:
    case DIGITAL_CHECKOUT_REQUEST:
    case DIGITAL_FORMAT_LOCK_REQUEST: {
      return state.mergeIn([action.payload.id], {
        isLoading: true,
        failedItemIds: Immutable.List(),
        successfulItemIds: Immutable.List()
      });
    }
    case CANCEL_HOLD_REQUEST:
    case UPDATE_PAUSE_HOLDS_REQUEST: {
      return state.mergeIn([action.workflowId], {
        isLoading: true
      });
    }

    case PLACE_HOLD_SUCCESS:
    case DIGITAL_CHECKOUT_SUCCESS:
    case DIGITAL_FORMAT_LOCK_SUCCESS: {
      return state.mergeIn([action.payload.id], {
        isLoading: false,
        failedItemIds: Immutable.List(),
        successfulItemIds: Immutable.List(),
        ...action.payload
      });
    }
    case CANCEL_HOLD_SUCCESS:
    case UPDATE_PAUSE_HOLDS_SUCCESS: {
      return state.mergeIn([action.workflowId], {
        ...action.payload,
        isLoading: false
      });
    }

    case PLACE_HOLD_FAILURE:
    case DIGITAL_CHECKOUT_FAILURE:
    case DIGITAL_FORMAT_LOCK_FAILURE: {
      return state.mergeIn([action.workflowId || action.metadataId], {
        isLoading: false,
        failedItemIds: Immutable.List(_.get(action, 'payload.ui.itemTransactions.failedItemIds')),
        successfulItemIds: Immutable.List(_.get(action, 'payload.ui.itemTransactions.successfulItemIds'))
      });
    }
    case CANCEL_HOLD_FAILURE:
    case UPDATE_PAUSE_HOLDS_FAILURE: {
      return state.mergeIn([action.workflowId], {
        isLoading: false
      });
    }

    case UPDATE_PICKUP_LOCATION: {
      return state.setIn([action.payload.id, 'selectedBranch'], action.payload.pickupLocation);
    }
    default:
      return state;
  }
}
