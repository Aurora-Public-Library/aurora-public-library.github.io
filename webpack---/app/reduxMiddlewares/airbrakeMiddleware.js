import ErrorService from 'app/services/ErrorService';

const NUM_RECENT_ACTIONS_TO_SEND = 5;
const FILTERED = '[FILTERED]';

export default function airbrakeMiddlewareFactory() {
  const actionsToSend = [];
  ErrorService.client?.addFilter(notice => {
    /* eslint-disable no-param-reassign */
    notice.context.recentActions = actionsToSend.map(action => {
      if (action.payload && action.payload.entities) {
        const filteredPayload = { ...action.payload };
        const { entities, auth } = action.payload;
        if (entities) {
          if (entities.accounts) {
            filteredPayload.entities.accounts = FILTERED;
          }
          if (entities.users) {
            filteredPayload.entities.users = FILTERED;
          }
        }

        if (auth && auth.currentUserId) {
          filteredPayload.auth.currentUserId = FILTERED;
        }

        return {
          ...action,
          payload: filteredPayload
        };
      }
      return action;
    });
    return notice;
  });

  return () => next => action => {
    if (action.type !== '@@INIT') {
      actionsToSend.splice(
        0,
        actionsToSend.length > NUM_RECENT_ACTIONS_TO_SEND ? actionsToSend.length - NUM_RECENT_ACTIONS_TO_SEND : 0,
        action
      );
    }

    return next(action);
  };
}
