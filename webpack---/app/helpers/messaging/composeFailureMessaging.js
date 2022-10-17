import composeMessaging from './composeMessaging';
import { STATUS_TYPES } from '../../constants/MessagingConstants';

const IGNORED_CLASSIFICATIONS = ['invalid_token', 'RailsSessionInvalidationException', 'HoldIsItemLevel'];

// Error types where it is acceptable to display the error message directly
const MESSAGE_CLASSIFICATION_WHITELIST = ['ILSException', 'RenewFailed', 'DigitalBadRequestException'];

const isIgnoredClassification = classification => IGNORED_CLASSIFICATIONS.indexOf(classification) !== -1;

const shouldUseMessage = classification => MESSAGE_CLASSIFICATION_WHITELIST.indexOf(classification) !== -1;

export default function composeFailureMessaging(messagingId, err = {}, opts = {}) {
  const { message = '', classification = '' } = err;

  if (isIgnoredClassification(classification)) {
    return {};
  }

  const emptyILSMessage = classification === 'ILSException' && message.length === 0;
  const messageId = emptyILSMessage ? 'errors.ServiceException' : `errors.${classification}`;
  const defaultMessage = shouldUseMessage(classification) ? message : '';

  return composeMessaging(STATUS_TYPES.Failure, messagingId, messageId, {
    defaultMessage,
    ...opts
  });
}
