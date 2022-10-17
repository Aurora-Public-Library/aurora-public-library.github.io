import { sendAnalyticsEvents } from '@bibliocommons/utils-analytics';

export default function analyticsMiddleware() {
  return () => next => action => {
    const { payload } = action;

    if (__CLIENT__ && payload && payload.analytics) {
      sendAnalyticsEvents(payload.analytics);
    }

    return next(action);
  };
}
