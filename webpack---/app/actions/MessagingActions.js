import MessagingConstants, { GLOBAL_MESSAGING_ID } from '../constants/MessagingConstants';

function clearMessages(ids) {
  return {
    type: MessagingConstants.CLEAR_MESSAGING,
    messagingIds: Array.isArray(ids) ? ids : [ids]
  };
}

function clearGlobalMessage() {
  return {
    type: MessagingConstants.CLEAR_MESSAGING,
    messagingIds: [GLOBAL_MESSAGING_ID]
  };
}

export default {
  clearMessages,
  clearGlobalMessage
};
