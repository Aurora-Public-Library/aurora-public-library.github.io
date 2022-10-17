import { createReduxConstants } from '@bibliocommons/utils-redux';

export const ITEM_TRANSACTION_WORKFLOW = 'ITEM_TRANSACTION_WORKFLOW';
export const ADDED_TO_SHELF_WORKFLOW = 'ADDED_TO_SHELF_WORKFLOW';
export const BATCH_ADDED_TO_SHELF_WORKFLOW = 'BATCH_ADDED_TO_SHELF_WORKFLOW';
export const SAVED_SEARCH_WORKFLOW = 'SAVED_SEARCH_WORKFLOW';
export const BATCH_CANCEL_HOLD_WORKFLOW = 'BATCH_CANCEL_HOLD_WORKFLOW';

export const BATCH_ACTIONS = 'BATCH_ACTIONS';

export default createReduxConstants('WORKFLOW', {
  UPDATE_WORKFLOW: null
});
