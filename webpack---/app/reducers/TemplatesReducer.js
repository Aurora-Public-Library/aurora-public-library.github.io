import Immutable from 'immutable';
import LibraryConstants from '../constants/LibraryConstants';

const initialState = Immutable.Map({
  header: '',
  js: '',
  css: '',
  footer: '',
  screenReaderNavigation: ''
});

export default function templates(state = initialState, action) {
  switch (action.type) {
    case LibraryConstants.LIBRARY_SUCCESS: {
      const { header, footer, js, css, screen_reader_navigation: screenReaderNavigation } =
        action.payload.templates || {};
      return state.withMutations(newState =>
        newState.merge({
          header,
          footer,
          js,
          css,
          screenReaderNavigation
        })
      );
    }
    default:
      return state;
  }
}
