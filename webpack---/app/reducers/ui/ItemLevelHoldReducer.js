import Immutable from 'immutable';
import _ from 'lodash';
import HoldsConstants from '../../constants/HoldsConstants';

const { FETCH_ITEM_GROUPS_REQUEST, FETCH_ITEM_GROUPS_SUCCESS, FETCH_ITEM_GROUPS_FAILURE } = HoldsConstants;

const initialState = Immutable.Map();

export default function itemLevelHoldReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEM_GROUPS_REQUEST: {
      return state.mergeIn([action.payload.id], {
        isFetching: true
      });
    }
    case FETCH_ITEM_GROUPS_SUCCESS:
    case FETCH_ITEM_GROUPS_FAILURE: {
      return state.mergeIn(_.keys(_.get(action, 'payload.entities.bibs')), {
        isFetching: false
      });
    }
    default:
      return state;
  }
}
