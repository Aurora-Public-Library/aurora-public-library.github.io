import Immutable from 'immutable';
import DrawerConstants from '../constants/DrawerConstants';

const initialState = Immutable.Map({
  open: false
});

export default function drawer(state = initialState, action) {
  switch (action.type) {
    case DrawerConstants.TOGGLE: {
      return state.set('open', !state.get('open'));
    }

    default:
      return state;
  }
}
