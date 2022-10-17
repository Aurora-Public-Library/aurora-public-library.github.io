import Immutable from 'immutable';
import ShelfConstants from '../../constants/ShelfConstants';

const {
  ADD_TO_SHELF_REQUEST,
  ADD_TO_SHELF_SUCCESS,
  ADD_TO_SHELF_FAILURE,
  REMOVE_FROM_SHELF_REQUEST,
  REMOVE_FROM_SHELF_SUCCESS,
  REMOVE_FROM_SHELF_FAILURE,
  UPDATE_SHELF_ITEM_REQUEST,
  UPDATE_SHELF_ITEM_SUCCESS,
  UPDATE_SHELF_ITEM_FAILURE
} = ShelfConstants;

const initialState = Immutable.Map();

export default function shelfTransactionsReducer(state = initialState, action) {
  const { isBatch, metadataIds, type, fields } = action;

  switch (type) {
    case ADD_TO_SHELF_REQUEST: {
      return state.withMutations(newState => {
        const transaction = isBatch ? { isBatchAdding: true } : { isAdding: true };
        metadataIds.forEach(id => newState.mergeIn([id], transaction));
      });
    }

    case REMOVE_FROM_SHELF_REQUEST: {
      return state.withMutations(newState => {
        const transaction = isBatch ? { isBatchRemoving: true } : { isRemoving: true };
        metadataIds.forEach(id => newState.mergeIn([id], transaction));
      });
    }

    case UPDATE_SHELF_ITEM_REQUEST: {
      return state.withMutations(newState => {
        const privacyTransaction = isBatch ? { isBatchUpdatingPrivacy: true } : { isUpdatingPrivacy: true };
        const moveTransaction = isBatch ? { isBatchMoving: true } : { isMoving: true };
        const transaction = fields.privateItem !== undefined ? privacyTransaction : moveTransaction;
        metadataIds.forEach(id => newState.mergeIn([id], transaction));
      });
    }

    case ADD_TO_SHELF_SUCCESS:
    case ADD_TO_SHELF_FAILURE:
    case UPDATE_SHELF_ITEM_SUCCESS:
    case UPDATE_SHELF_ITEM_FAILURE:
    case REMOVE_FROM_SHELF_FAILURE:
    case REMOVE_FROM_SHELF_SUCCESS: {
      return state.withMutations(newState => {
        metadataIds.forEach(id => newState.delete(id));
      });
    }

    default:
      return state;
  }
}
