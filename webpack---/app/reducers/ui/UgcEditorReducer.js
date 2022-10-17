import Immutable from 'immutable';
import UgcEditorConstants from 'app/constants/UgcEditorConstants';

const initialState = Immutable.Map();

export default function ugcEditorReducer(state = initialState, action) {
  switch (action.type) {
    case UgcEditorConstants.OPEN_EDITOR: {
      return state.set(action.ugcType, true);
    }

    case UgcEditorConstants.CLOSE_EDITOR:
      return state.delete(action.ugcType);

    default:
      return state;
  }
}
