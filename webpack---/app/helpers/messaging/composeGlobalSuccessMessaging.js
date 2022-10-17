import composeSuccessMessaging from './composeSuccessMessaging';
import { GLOBAL_MESSAGING_ID } from '../../constants/MessagingConstants';

export default function composeGlobalSuccessMessaging(messageId, opts = {}) {
  return composeSuccessMessaging(GLOBAL_MESSAGING_ID, messageId, opts);
}
