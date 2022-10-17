import { concat, of } from 'rxjs';
import { filter, flatMap, switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import _ from 'lodash';
import Immutable from 'immutable';

import { updatePickupLocation } from '../actions/HoldActions';
import HoldsConstants, { WORKFLOW_VIEWS } from '../constants/HoldsConstants';
import WorkflowActions from '../actions/WorkflowActions';
import { ITEM_TRANSACTION_WORKFLOW } from '../constants/WorkflowConstants';

const itemLevelHoldExceptionEpic = action$ => {
  return action$.pipe(
    ofType(HoldsConstants.PLACE_HOLD_REQUEST),
    switchMap(placeHoldAction =>
      action$.pipe(
        ofType(HoldsConstants.PLACE_HOLD_FAILURE),
        filter(action => _.get(action, 'payload.error.classification') === 'HoldIsItemLevel'),
        flatMap(action =>
          concat(
            of(updatePickupLocation(action.workflowId, placeHoldAction.payload.selectedBranch)),
            of(
              WorkflowActions.updateWorkflow(
                action.workflowId,
                ITEM_TRANSACTION_WORKFLOW,
                Immutable.Map({
                  metadataId: action.workflowId,
                  step: WORKFLOW_VIEWS.ITEM_LEVEL_HOLD,
                  messagingId: action.messagingId
                }),
                true,
                true
              )
            )
          )
        )
      )
    )
  );
};

export default itemLevelHoldExceptionEpic;
