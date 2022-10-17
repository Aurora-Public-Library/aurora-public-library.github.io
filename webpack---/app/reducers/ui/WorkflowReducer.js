import Immutable from 'immutable';
import _ from 'lodash';
import CheckoutConstants from '../../constants/CheckoutConstants';
import HoldsConstants, { WORKFLOW_VIEWS } from '../../constants/HoldsConstants';
import WorkflowConstants, {
  ADDED_TO_SHELF_WORKFLOW,
  ITEM_TRANSACTION_WORKFLOW
} from '../../constants/WorkflowConstants';
import ShelfConstants, { SHELF_NAMES, WORKFLOW_VIEWS as SHELF_WORKFLOW_VIEWS } from '../../constants/ShelfConstants';
import SavedSearchConstants from '../../constants/SavedSearchConstants';

const initialState = Immutable.Map();

const mapDigitalFailureToWorkflow = (classification, metadataId) => {
  switch (classification) {
    case 'TitleNotAvailable':
      return Immutable.fromJS({
        name: ITEM_TRANSACTION_WORKFLOW,
        view: { step: WORKFLOW_VIEWS.DIGITAL_HOLD, metadataId }
      });
    case 'TitleIsAvailable':
      return Immutable.fromJS({
        name: ITEM_TRANSACTION_WORKFLOW,
        view: { step: WORKFLOW_VIEWS.DIGITAL_CHECKOUT, metadataId }
      });
    default:
      return null;
  }
};

const getShelfWorkflowViewName = shelfToAdd => {
  switch (shelfToAdd) {
    case SHELF_NAMES.FOR_LATER:
      return SHELF_WORKFLOW_VIEWS.ADDED_TO_FOR_LATER_SHELF;
    case SHELF_NAMES.COMPLETED:
      return SHELF_WORKFLOW_VIEWS.ADDED_TO_COMPLETED_SHELF;
    case SHELF_NAMES.IN_PROGRESS:
      return SHELF_WORKFLOW_VIEWS.ADDED_TO_IN_PROGRESS_SHELF;
    default:
      return '';
  }
};

export default function WorkflowReducer(state = initialState, action) {
  switch (action.type) {
    case WorkflowConstants.UPDATE_WORKFLOW: {
      return state.setIn(
        [action.payload.id],
        Immutable.fromJS({
          name: action.payload.workflow,
          view: action.payload.view
        })
      );
    }

    case HoldsConstants.CANCEL_HOLD_SUCCESS: {
      return action.isBatch ? state : state.delete(action.workflowId);
    }

    case HoldsConstants.UPDATE_PAUSE_HOLDS_SUCCESS: {
      return state.delete(action.workflowId);
    }

    case HoldsConstants.PLACE_HOLD_SUCCESS:
    case HoldsConstants.UPDATE_PAUSE_HOLDS_SUCCESS:
    case CheckoutConstants.DIGITAL_CHECKOUT_SUCCESS:
    case CheckoutConstants.DIGITAL_FORMAT_LOCK_SUCCESS: {
      return state.delete(action.workflowId || action.payload.id);
    }

    case ShelfConstants.REMOVE_FROM_SHELF_SUCCESS: {
      return action.workflowId ? state.delete(action.workflowId) : state;
    }

    case ShelfConstants.SHOW_POST_ADD_TO_SHELF_VIEW: {
      if (action.payload.existsOnShelf) {
        return state.setIn(
          [action.workflowId],
          Immutable.Map({
            name: ADDED_TO_SHELF_WORKFLOW,
            view: SHELF_WORKFLOW_VIEWS.EXISTS_ON_SHELF,
            metadataId: action.id
          })
        );
      }

      if (action.payload.ui && action.payload.ui.messages[action.id]) {
        return state.setIn(
          [action.workflowId],
          Immutable.Map({
            name: ADDED_TO_SHELF_WORKFLOW,
            view: getShelfWorkflowViewName(action.payload.ui.messages[action.id].message.values.shelf)
          })
        );
      }

      return state;
    }

    case HoldsConstants.PLACE_HOLD_FAILURE:
    case CheckoutConstants.DIGITAL_CHECKOUT_FAILURE: {
      const newWorkflow = mapDigitalFailureToWorkflow(_.get(action, 'payload.error.classification'), action.workflowId);

      if (newWorkflow) {
        return state.set(action.workflowId, newWorkflow);
      }

      return state;
    }

    case SavedSearchConstants.SAVE_SUCCESS: {
      return state.delete('searchTitle');
    }

    default:
      return state;
  }
}
