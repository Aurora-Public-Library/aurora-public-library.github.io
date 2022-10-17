import composeNeutralMessaging from './composeNeutralMessaging';
import { GLOBAL_MESSAGING_ID } from '../../constants/MessagingConstants';

export default function composeGlobalNeutralMessaging(messageId, opts = {}) {
  return composeNeutralMessaging(GLOBAL_MESSAGING_ID, messageId, opts);
}
