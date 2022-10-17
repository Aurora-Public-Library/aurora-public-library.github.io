import Immutable from 'immutable';
import ListPresentationConstants from '../../constants/ListPresentationConstants';

const initialState = Immutable.Map({
  view: 'medium'
});

export default function ListPresentationReducer(state = initialState, action) {
  switch (action.type) {
    case ListPresentationConstants.TOGGLE_LIST_VIEW:
      return state.set('view', action.payload.view);
    default:
      return state;
  }
}
