import Immutable from 'immutable';
import AppConstants from '../constants/AppConstants';

const initialState = Immutable.Map({
  appVersion: null,
  basePath: '/v2',
  baseURL: null,
  coreAssets: Immutable.Map(),
  currentURL: null,
  apiGatewayURL: null,
  libraryDomain: null,
  datadogConfig: Immutable.Map(),
  airbrakeConfig: Immutable.Map(),
  featureOverrides: Immutable.Map(),
  authRequired: null,
  accountRequired: null,
  internalCoreGAId: null,
  internalEventsGAId: null,
  enableWebpackHMR: false,
  enableReduxDevTools: false,
  coreCssFingerprint: null,
  localBranch: null,
  mobileApp: false
});

export default function app(state = initialState, action) {
  switch (action.type) {
    case AppConstants.INITIALIZE: {
      return state.merge(action.appConfig);
    }

    default:
      return state;
  }
}
