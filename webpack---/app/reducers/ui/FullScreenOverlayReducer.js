import Immutable from 'immutable';
import FullScreenOverlayConstants from '../../constants/FullScreenOverlayConstants';

const initialState = Immutable.Map();

export default function fullScreenOverlay(state = initialState, action) {
  switch (action.type) {
    case FullScreenOverlayConstants.OPEN_FULLSCREEN_OVERLAY: {
      const { overlayKey, overlayData } = action;
      if (state.getIn([overlayKey, 'open'])) {
        // When multiple overlays have the same key, all of them would
        // be opened by this action, which leads to lots of issues.
        // This can happen when the component is rendered multiple
        // times on the page, using the same `overlayKey`.
        throw new Error(
          `Another overlay with the overlayKey "${overlayKey}" is already open. Each overlay instance must have a unique key.`
        );
      }

      return state.set(overlayKey, Immutable.fromJS({ ...overlayData, open: true }));
    }

    case FullScreenOverlayConstants.CLOSE_FULLSCREEN_OVERLAY:
      return initialState;

    default:
      return state;
  }
}
