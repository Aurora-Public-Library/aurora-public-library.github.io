import composeGlobalSuccessMessaging from '../messaging/composeGlobalSuccessMessaging';
import composeSuccessMessaging from '../messaging/composeSuccessMessaging';

import composeGlobalFailureMessaging from '../messaging/composeGlobalFailureMessaging';
import composeFailureMessaging from '../messaging/composeFailureMessaging';

import composeGlobalNeutralMessaging from '../messaging/composeGlobalNeutralMessaging';
import composeNeutralMessaging from '../messaging/composeNeutralMessaging';

import composeMessaging from '../messaging/composeMessaging';
import { GLOBAL_MESSAGING_ID, STATUS_TYPES } from '../../constants/MessagingConstants';

export default function composeMessagingForBatchAction({
  total,
  failures,
  successId,
  mixedId,
  failureId,
  values,
  useFormattedMessage = false,
  messagingId
}) {
  if (failures && failures.length > 0) {
    const successCount = Math.max(total - failures.length, 0);
    const failureCount = failures.length;

    // If there was only one item and it failed, show the error directly
    if (failureCount === 1 && successCount === 0) {
      return messagingId
        ? composeFailureMessaging(messagingId, failures[0].errorResponseDTO, {
            values,
            useFormattedMessage
          })
        : composeGlobalFailureMessaging(failures[0].errorResponseDTO, {
            values,
            useFormattedMessage
          });
    }

    const failureMessage = composeMessaging(STATUS_TYPES.Failure, messagingId || GLOBAL_MESSAGING_ID, failureId, {
      values: { ...values, count: failureCount },
      useFormattedMessage
    });

    const neutralOptions = {
      values: { ...values, successCount, failureCount },
      useFormattedMessage
    };
    const neutralMessage = messagingId
      ? composeNeutralMessaging(messagingId, mixedId, neutralOptions)
      : composeGlobalNeutralMessaging(mixedId, neutralOptions);

    return successCount === 0 ? failureMessage : neutralMessage;
  }

  return messagingId
    ? composeSuccessMessaging(messagingId, successId, {
        values,
        useFormattedMessage
      })
    : composeGlobalSuccessMessaging(successId, { values, useFormattedMessage });
}
