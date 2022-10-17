import composeMessaging from './composeMessaging';
import { STATUS_TYPES } from '../../constants/MessagingConstants';

export default function composeSuccessMessaging(messagingId, messageId, opts = {}) {
  return composeMessaging(STATUS_TYPES.Success, messagingId, messageId, opts);
}
