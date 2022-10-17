import PropTypes from 'prop-types';
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ToastMessage } from '@bibliocommons/shared-messages';
import { messagingShape } from '@bibliocommons/bc-prop-types';
import Portal from '@bibliocommons/base-portal';

import './GlobalMessagingContainer.scss';

const actionButtonTypes = {};

function GlobalMessaging({ messaging, messagingActions }) {
  function renderActionButton() {
    const actionButtonType = messaging.get('actionButtonType');
    const actionButtonProps = messaging.get('actionButtonProps');
    const Component = actionButtonTypes[actionButtonType];

    if (actionButtonType) {
      if (!Component) {
        throw new Error(
          `"${actionButtonType}" has not been registered. See: 'GlobalMessaging.registerActionButtonType'.`
        );
      }
      return <Component {...actionButtonProps?.toJS()} />;
    }

    return null;
  }

  return (
    <Portal>
      <TransitionGroup>
        {messaging && (
          <CSSTransition
            classNames="global-messaging-slide-up"
            timeout={{ enter: 250, exit: 100 }}
            key="global-messaging"
            mountOnEnter
            unmountOnExit
          >
            <ToastMessage
              message={messaging.get('message')}
              fieldErrors={messaging.get('fieldErrors')}
              duration={messaging.get('duration')}
              failureDuration={messaging.get('failureDuration')}
              values={messaging.get('values')}
              useFormattedMessage={messaging.get('useFormattedMessage')}
              clearMessages={() => messagingActions.clearGlobalMessage()}
              renderActionButton={renderActionButton}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </Portal>
  );
}

GlobalMessaging.propTypes = {
  messaging: messagingShape,
  messagingActions: PropTypes.objectOf(PropTypes.func).isRequired
};

GlobalMessaging.registerActionButtonType = (name, Component) => {
  actionButtonTypes[name] = Component;
};

export default GlobalMessaging;
