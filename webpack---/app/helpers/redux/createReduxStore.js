/* eslint-disable global-require */
import values from 'lodash/values';
import compact from 'lodash/compact';
import thunk from 'redux-thunk';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutablejs';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import BCGoogleAnalyticsUtils from '@bibliocommons/utils-google-analytics';
import airbrakeMiddleware from '../../reduxMiddlewares/airbrakeMiddleware';
import apiRequestMiddleware from '../../reduxMiddlewares/apiRequestMiddleware';
import authMiddleware from '../../reduxMiddlewares/authMiddleware';
import redirectMiddleware from '../../reduxMiddlewares/redirectMiddleware';
import gaMiddleware from '../../reduxMiddlewares/gaMiddleware';
import analyticsMiddleware from '../../reduxMiddlewares/analyticsMiddleware';
import serializabilityMiddleware from '../../reduxMiddlewares/serializabilityMiddleware';

/**
 * @param  {object} initialState - initial state (@see redux.createStore(), second argument)
 * @param  {object} apiClient - we inject the httpClient for easier mocking
 *                            plus easily changing http library on client and server.
 *                            (note - this will change with webpack build)
 * @param  {boolean} enableWebpackHMR - whether to enable hot module reloading (@see config)
 *
 * @return {object} - redux stored with all the initial data loaded
 */
export default function createReduxStore(
  initialState,
  apiClient,
  enableWebpackHMR = false,
  enableReduxDevTools = false
) {
  const epicMiddleware = createEpicMiddleware();
  const middlewares = [
    authMiddleware(apiClient),
    redirectMiddleware,
    apiRequestMiddleware(apiClient),
    epicMiddleware,
    thunk.withExtraArgument(apiClient),
    airbrakeMiddleware(),
    gaMiddleware(BCGoogleAnalyticsUtils),
    analyticsMiddleware(),
    serializabilityMiddleware
  ];

  let combinedReducers = combineReducers(require('../../reducers').default);
  const lastCreatedStore = createStore(
    combinedReducers,
    initialState,
    compose(
      applyMiddleware(...compact(middlewares)),
      enableReduxDevTools && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
  );

  const rootEpic = (...args) => combineEpics(...values(require('../../epics')))(...args, apiClient);
  const epic$ = new BehaviorSubject(rootEpic);
  // Every time a new epic is given to epic$ it will unsubscribe from the
  // previous one then call and subscribe to the new one because of how switchMap works
  const hotReloadingEpic = (...args) => epic$.pipe(switchMap(epic => epic(...args)));
  epicMiddleware.run(hotReloadingEpic);

  if (enableWebpackHMR && module.hot) {
    module.hot.accept('../../reducers', () => {
      combinedReducers = combineReducers(require('../../reducers').default);
      const nextRootEpic = combineEpics(...values(require('../../epics')));
      lastCreatedStore.replaceReducer(combinedReducers);
      epic$.next(nextRootEpic);
    });
  }

  return lastCreatedStore;
}
