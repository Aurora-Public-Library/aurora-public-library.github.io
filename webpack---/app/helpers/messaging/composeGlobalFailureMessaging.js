import composeFailureMessaging from './composeFailureMessaging';
import { GLOBAL_MESSAGING_ID } from '../../constants/MessagingConstants';

export default function composeGlobalFailureMessaging(error, opts = {}) {
  return composeFailureMessaging(GLOBAL_MESSAGING_ID, error, opts);
}
