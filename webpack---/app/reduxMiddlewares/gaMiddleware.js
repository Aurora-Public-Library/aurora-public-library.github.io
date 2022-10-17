import _ from 'lodash';
// Value                  Notes
// --------------------------------------------------------
// event.eventCategory          String. Required. A top level category for these events.
//                                E.g. 'User', 'Navigation', 'App Editing', etc.
// event.eventAction            String. Required. A description of the behaviour.
//                                E.g. 'Clicked Delete', 'Added a component', 'Deleted account', etc.
// event.eventLabel             String. Optional. More precise labelling of the related action.
//                                E.g. alongside the 'Added a component' action, we could add the name of
//                                a component as the label. E.g. 'Survey', 'Heading', 'Button', etc.
// event.eventValue             Int. Optional. A means of recording a numerical value against an event.
//                                 E.g. a rating, a score, etc.
// event.nonInteraction    Boolean. Optional. If an event is not triggered by a user interaction,
//                                 but instead by our code (e.g. on page load, it should be flagged
//                                 as a nonInteraction event to avoid skewing bounce rate data.
// event.transport         String. Optional. This specifies the transport mechanism with which hits will be sent.
//                                 Valid values include 'beacon', 'xhr', or 'image'.
// event.sendToLibrary     Boolean. Optional. Sends the event to the library's GA as well.

export default function gaMiddleware(BCGoogleAnalyticsUtils) {
  return store => next => action => {
    const { middlewareData } = action;
    if (!middlewareData || !middlewareData.gaEvent) {
      return next(action);
    }

    const state = store.getState();
    const value = _.isFunction(middlewareData.gaEvent) ? middlewareData.gaEvent(state) : middlewareData.gaEvent;
    const sendToLibrary = !!middlewareData.gaEvent.sendToLibrary;
    delete middlewareData.gaEvent.sendToLibrary;
    if (!value.eventCategory || !value.eventAction) {
      throw new Error('GA events require a eventCategory and an eventAction');
    } else {
      BCGoogleAnalyticsUtils.event(value, sendToLibrary);
    }

    return next(action);
  };
}
