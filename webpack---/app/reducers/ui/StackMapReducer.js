import Immutable from 'immutable';
import StackMapConstants from 'app/constants/StackMapConstants';

const { REQUEST, SUCCESS, FAILURE, CLOSE } = StackMapConstants;

const initialState = Immutable.fromJS({
  data: null,
  stackMapTransactions: {
    open: false,
    noResults: false,
    isFetching: false
  }
});

export default function stackMap(state = initialState, action) {
  switch (action.type) {
    case REQUEST: {
      return state.merge({
        stackMapTransactions: {
          open: true,
          isFetching: true
        }
      });
    }

    case SUCCESS: {
      if (action.payload && action.payload.stat === 'OK' && action.payload.results.maps.length > 0) {
        return state.mergeDeep({
          data: action.payload.results,
          stackMapTransactions: {
            open: true,
            isFetching: false,
            noResults: action.payload.results.maps.length === 0
          }
        });
      }

      return state.merge({
        stackMapTransactions: {
          noResults: true,
          isFetching: false,
          open: true
        }
      });
    }

    case FAILURE: {
      return state.merge({
        stackMapTransactions: {
          open: true,
          noResults: true,
          isFetching: false
        }
      });
    }

    case CLOSE: {
      return initialState;
    }

    default:
      return state;
  }
}
