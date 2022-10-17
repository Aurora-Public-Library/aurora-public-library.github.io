import omit from 'lodash/omit';
import composeFailureMessaging from '../helpers/messaging/composeFailureMessaging';
import composeGlobalFailureMessaging from '../helpers/messaging/composeGlobalFailureMessaging';

/**
 * Middleware for making and handling asynchronous requests to the API Gateway.
 *
 * Handles actions with the following properties:
 *  apiRequest:         A function to make the API request, with the signature `(state, apiClient)`.
 *                        Should return an `Observable`.
 *  types:              [BEFORE_REQUEST, SUCCESS, FAILURE], to be used as the action's `type`
 *                        during the request and when it completes.
 *  apiSuccess:         A function which can be used modify the `SUCCESS` action before being passed along,
 *                        with the signature `(responseBody, store)`. This is meant to be used by action creators.
 *  apiFailure:         A function which can be used modify the `FAILURE` action before being passed along,
 *                        with the signature `(responseBody, store)`. This is meant to be used by action creators.
 *  postSuccess:        A function which takes the `state`, and returns an optional `action` object,
 *                        to be dispatched separately after the `SUCCESS` action.
 *                        This is mostly passed by components when calling actions.
 *  postFailure:        A function which takes the `error` and `state`, and returns an optional `action`
 *                        object, to be dispatched separately after the `FAILURE` action.
 *                        This is mostly passed by components when calling actions.
 *
 * NB: BEFORE_REQUEST, as implied, is called before `apiRequest()` is called.
 * This fact is very important if you have reducers that modify the state in
 * response to BEFORE_REQUEST, as `apiRequest()` will be passed the modified
 * state.
 *
 * @param {object} apiClient
 */
export default function apiRequestMiddleware(apiClient) {
  return store => next => action => {
    if (!action.apiRequest) {
      return next(action);
    }

    const { apiRequest, apiSuccess, apiFailure, types, middlewareData, postSuccess, postFailure, ...rest } = action;

    const originalPayload = rest.payload || {};
    const [BEFORE_REQUEST, SUCCESS, FAILURE] = types;
    const basicMiddleware = omit(middlewareData, ['gaEvent', 'appEvent', 'gtmEvent']);

    if (!BEFORE_REQUEST) {
      throw new Error(`Expected "action.types[0]" to be defined. Found [${types.join(', ')}]`);
    }

    if (!SUCCESS) {
      throw new Error(`Expected "action.types[1]" to be defined. Found [${types.join(', ')}]`);
    }

    if (!FAILURE) {
      throw new Error(`Expected "action.types[2]" to be defined. Found [${types.join(', ')}]`);
    }

    return Promise.resolve()
      .then(() =>
        store.dispatch({
          ...rest,
          originalPayload,
          middlewareData: basicMiddleware,
          type: BEFORE_REQUEST
        })
      )
      .then(() => apiRequest(store.getState(), apiClient).toPromise())
      .catch(async err => {
        const { response, status } = err;
        const res = response || {};
        const body = res.body || {};
        const { error } = body;

        // Default error messaging
        const method = err.method || res.error?.method || res.request?.method;
        const defaultMessaging =
          ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) && !error?.fieldErrors
            ? {
                messaging: action.messagingId
                  ? composeFailureMessaging(action.messagingId, error)
                  : composeGlobalFailureMessaging(error)
              }
            : {};

        const failureAction = {
          ...defaultMessaging,
          ...rest,
          middlewareData,
          type: FAILURE,
          payload: {
            ...originalPayload,
            status,
            ...body,
            preLoginAction: action // In case the action failed because the session expired
          }
        };

        // Allow the failure action to be modified before passing along.
        if (apiFailure) {
          Object.assign(failureAction, await apiFailure(body, store, apiClient));
        }

        // Allow the login success handler to capture the failure action
        // This means, neither the `failureAction` nor the `postFailureAction` should be dispatched.
        if (middlewareData?.postLogin) {
          throw failureAction;
        }

        // IMPORTANT: This will cause 500 errors from the API to be reported appropriately during server-side rendering.
        const { ignoreServerErrors } = middlewareData || {};
        if (__SERVER__ && res.serverError && !ignoreServerErrors) {
          throw failureAction;
        }

        const dispatched = await store.dispatch(failureAction);

        if (dispatched && postFailure) {
          const postFailureAction = postFailure(error, store.getState());
          if (postFailureAction) {
            await store.dispatch(postFailureAction);
          }
        }
      })
      .then(async response => {
        if (response) {
          const successAction = {
            ...rest,
            middlewareData,
            type: SUCCESS,
            payload: {
              ...originalPayload,
              ...(response.body || {})
            }
          };

          // Allow the success action to be modified before passing along.
          if (apiSuccess) {
            Object.assign(successAction, await apiSuccess(response.body, store, apiClient));
          }

          // Allow the login success handler to capture the success action.
          // This means, neither the `successAction` nor the `postSuccessAction` should be dispatched.
          if (middlewareData?.postLogin) {
            return successAction;
          }

          const dispatched = await store.dispatch(successAction);

          if (dispatched && postSuccess) {
            const postSuccessAction = postSuccess(store.getState());
            if (postSuccessAction) {
              await store.dispatch(postSuccessAction);
            }
          }
        }

        return undefined;
      });
  };
}
