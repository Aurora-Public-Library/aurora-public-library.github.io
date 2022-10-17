import composeMessaging from './composeMessaging';
import { STATUS_TYPES } from '../../constants/MessagingConstants';

export default function composeNeutralMessaging(messagingId, messageId, opts = {}) {
  return composeMessaging(STATUS_TYPES.Neutral, messagingId, messageId, opts);
}
