export default function composeMessaging(messageType, messagingId, messageId, opts = {}) {
  const {
    defaultMessage = '',
    values = {},
    duration,
    fieldErrors,
    failureDuration,
    useFormattedMessage,
    actionButtonType,
    actionButtonProps
  } = opts;

  return {
    [messagingId]: {
      message: {
        type: messageType,
        id: messageId,
        defaultMessage,
        values
      },
      duration,
      fieldErrors,
      failureDuration,
      useFormattedMessage,
      actionButtonType,
      actionButtonProps
    }
  };
}
