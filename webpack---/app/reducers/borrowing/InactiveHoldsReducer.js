import Immutable from 'immutable';
import HoldsConstants from '../../constants/HoldsConstants';

const initialState = Immutable.fromJS({
  cancelled: {
    fetching: false,
    pagination: {}
  },
  expired: {
    fetching: false,
    pagination: {}
  }
});

export default function holds(state = initialState, action) {
  switch (action.type) {
    case HoldsConstants.FETCH_CANCELLED_HOLDS_REQUEST:
      return state.mergeDeep({
        cancelled: {
          fetching: true
        }
      });
    case HoldsConstants.FETCH_CANCELLED_HOLDS_SUCCESS: {
      const holdsData = action.payload.borrowing.holds || {};
      return state.merge({
        cancelled: {
          pagination: holdsData.pagination || {},
          holdIds: holdsData.items || [],
          fetching: false
        }
      });
    }
    case HoldsConstants.FETCH_CANCELLED_HOLDS_FAILURE:
      return state.mergeDeep({
        cancelled: {
          fetching: false
        }
      });

    case HoldsConstants.FETCH_EXPIRED_HOLDS_REQUEST:
      return state.mergeDeep({
        expired: {
          fetching: true
        }
      });

    case HoldsConstants.FETCH_EXPIRED_HOLDS_SUCCESS: {
      const holdsData = action.payload.borrowing.holds || {};
      return state.merge({
        expired: {
          pagination: holdsData.pagination || {},
          holdIds: holdsData.items || [],
          fetching: false
        }
      });
    }
    case HoldsConstants.FETCH_EXPIRED_HOLDS_FAILURE:
      return state.mergeDeep({
        expired: {
          fetching: false
        }
      });
    default:
      return state;
  }
}
