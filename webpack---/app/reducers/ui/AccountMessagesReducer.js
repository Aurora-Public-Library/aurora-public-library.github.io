import Immutable from 'immutable';
import MessagesConstants from '../../constants/MessagesConstants';

const initialState = Immutable.Map({
  fetching: false
});

export default function accountMessages(state = initialState, action) {
  switch (action.type) {
    case MessagesConstants.FETCH_MESSAGES_REQUEST:
      return state.mergeDeep({
        fetching: true
      });

    case MessagesConstants.FETCH_MESSAGES_SUCCESS:
    case MessagesConstants.FETCH_MESSAGES_FAILURE:
      return state.mergeDeep({
        fetching: false
      });

    default:
      return state;
  }
}
