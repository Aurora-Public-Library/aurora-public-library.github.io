import Immutable from 'immutable';
import moment from 'moment';
import _values from 'lodash/values';
import keyBy from 'lodash/keyBy';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import HoldApi from '../api/HoldApi';
import { MATERIAL_TYPE_PHYSICAL, MATERIAL_TYPE_DIGITAL } from '../constants/BibConstants';
import HoldsConstants, { WORKFLOW_VIEWS, HOLD_DATE_FORMAT, HOLD_STATUS_TYPES } from '../constants/HoldsConstants';
import { ITEM_TRANSACTION_WORKFLOW } from '../constants/WorkflowConstants';
import { selectCurrentAccount } from '../selectors/AuthSelector';
import { selectPickupBranches, selectCurrentLibrary } from '../selectors/LibrarySelector';
import { openModal } from './ModalActions';
import ShelfActions from './ShelfActions';
import WorkflowActions from './WorkflowActions';
import addFieldToResponseAnalytics from '../helpers/analytics/addFieldToResponseAnalytics';
import composeSuccessMessaging from '../helpers/messaging/composeSuccessMessaging';
import composeGlobalSuccessMessaging from '../helpers/messaging/composeGlobalSuccessMessaging';
import composeGlobalFailureMessaging from '../helpers/messaging/composeGlobalFailureMessaging';
import composeFailureMessaging from '../helpers/messaging/composeFailureMessaging';
import { selectBibEntities } from '../selectors/EntitiesSelector';
import composeMessagingForBatchAction from '../helpers/borrowing/composeMessagingForBatchAction';
import composeMessaging from '../helpers/messaging/composeMessaging';
import { STATUS_TYPES, GLOBAL_MESSAGING_ID } from '../constants/MessagingConstants';

function shouldUseSingleClickHolds(singleClickHoldsSettings, branches, materialType, itemLevelHold) {
  if (materialType === MATERIAL_TYPE_PHYSICAL && !itemLevelHold) {
    if (branches.size === 0) {
      return true;
    }

    const enabled = singleClickHoldsSettings.get('enabled');
    const pickupLocation = branches.find(branch => branch.get('code') === singleClickHoldsSettings.get('branchId'));
    return enabled && pickupLocation;
  }

  return false;
}

function handlePlaceHoldSuccess({ messagingId, response, store, reciprocalRank }) {
  const { successCount } = response;
  let values = { count: successCount, position: 0 };
  const holds = _values(response.entities.holds) || [];
  const firstHold = holds[0];
  if (firstHold) {
    const bibs = selectBibEntities(store.getState());
    const title = bibs.getIn([firstHold.metadataId, 'briefInfo', 'title'], '');
    const position = firstHold.holdsPosition || 0;
    values = { ...values, position, title };
  }

  let messageId = 'message_item_holds_placed_no_position';
  if (successCount === 1) {
    messageId = values.position > 0 ? 'message_item_hold_placed' : 'message_item_hold_placed_no_position';
  }

  const augmentedResponse = reciprocalRank
    ? {
        payload: addFieldToResponseAnalytics(response, 'reciprocalRank', reciprocalRank)
      }
    : {};

  return {
    ...augmentedResponse,
    messaging: messagingId
      ? composeSuccessMessaging(messagingId, messageId, { values })
      : composeGlobalSuccessMessaging(messageId, { values })
  };
}

function handlePlaceHoldFailure({ messagingId, metadataId, response, store, materialType }) {
  const { error } = response;
  const bibs = selectBibEntities(store.getState());
  const provider = bibs.getIn([metadataId, 'policy', 'provider'], '');
  const values = { provider: <FormattedMessage id={`digital_service_type_${provider.toLowerCase()}`} /> };
  const messaging = messagingId
    ? composeFailureMessaging(messagingId, error, { values })
    : composeGlobalFailureMessaging(error, { values });

  // Special case for when the library doesn't own the digital bib.
  // TODO: This was an old logic migrated from the api-gateway.
  // Investigate whether we still need it or if it should be solved differently (CORE-54946).
  if (materialType === MATERIAL_TYPE_DIGITAL && error && error.classification === 'HoldNotAllowed') {
    return {
      messaging,
      entities: {
        bibs: {
          [metadataId]: {
            availability: {
              status: 'RESOURCE_NOT_FOUND',
              localisedStatus: 'RESOURCE_NOT_FOUND'
            }
          }
        }
      }
    };
  }

  return {
    messaging
  };
}

function filterFailedIds(holdIds, failures) {
  const failuresById = keyBy(failures, d => d.id);
  return holdIds.filter(holdId => !failuresById[holdId]);
}

export function placeHold({
  workflowId,
  messagingId,
  accountId,
  metadataId,
  materialType,
  enableSingleClickHolds = false,
  materialParams,
  reciprocalRank,
  postSuccess
}) {
  return {
    workflowId,
    messagingId,
    metadataId,
    postSuccess,
    payload: {
      id: metadataId,
      selectedBranch: materialParams.branchId
    },
    middlewareData: {
      accountRequired: true
    },
    types: [HoldsConstants.PLACE_HOLD_REQUEST, HoldsConstants.PLACE_HOLD_SUCCESS, HoldsConstants.PLACE_HOLD_FAILURE],
    apiRequest: (state, apiClient) =>
      HoldApi.placeHold(
        {
          metadataId,
          materialType,
          accountId,
          enableSingleClickHolds,
          materialParams: {
            ...materialParams,
            errorMessageLocale: state.getIn(['localization', 'currentLanguage'], 'en-US')
          }
        },
        apiClient
      ),
    apiSuccess: (response, store) => handlePlaceHoldSuccess({ messagingId, response, store, reciprocalRank }),
    apiFailure: (response, store) => handlePlaceHoldFailure({ messagingId, metadataId, response, store, materialType })
  };
}

/**
 * Place an Item Level Hold on one or more items of a Bib
 *
 * @param {String} metadataId metadataId of the bib
 * @param {Array<String>} itemIds itemIds to place hold on
 * @param {String} branchId branch to place the hold at
 */
export function placeItemHold({ metadataId, itemIds, branchId, messagingId, workflowId, postSuccess }) {
  return {
    messagingId,
    metadataId,
    workflowId,
    payload: {
      id: metadataId
    },
    middlewareData: {
      accountRequired: true
    },
    types: [HoldsConstants.PLACE_HOLD_REQUEST, HoldsConstants.PLACE_HOLD_SUCCESS, HoldsConstants.PLACE_HOLD_FAILURE],
    apiRequest: (state, apiClient) =>
      HoldApi.placeHold(
        {
          metadataId,
          accountId: selectCurrentAccount(state).get('id'),
          materialType: MATERIAL_TYPE_PHYSICAL,
          materialParams: {
            branchId,
            errorMessageLocale: state.getIn(['localization', 'currentLanguage']),
            itemIds
          }
        },
        apiClient
      ),
    apiSuccess: (response, store) => handlePlaceHoldSuccess({ messagingId, response, store }),
    apiFailure: (response, store) => handlePlaceHoldFailure({ messagingId, metadataId, response, store }),
    postSuccess
  };
}

export function cancelHold({
  accountId,
  metadataIds,
  holdIds,
  shelfState,
  messagingId,
  workflowId,
  postSuccess,
  isBatch = false
}) {
  return {
    workflowId,
    messagingId,
    isBatch,
    holdIds,
    middlewareData: {
      accountRequired: true
    },
    types: [HoldsConstants.CANCEL_HOLD_REQUEST, HoldsConstants.CANCEL_HOLD_SUCCESS, HoldsConstants.CANCEL_HOLD_FAILURE],
    apiRequest: (state, apiClient) => HoldApi.cancelHold({ accountId, holdIds, metadataIds }, apiClient),
    apiSuccess: ({ failures }) => {
      const cancelledHoldIds = filterFailedIds(holdIds, failures);
      return {
        deletedEntities: cancelledHoldIds.map(id => `holds.${id}`),
        messaging: composeMessagingForBatchAction({
          messagingId,
          total: holdIds.length,
          failures,
          successId: 'message_successful_cancel_holds',
          mixedId: 'message_mixed_cancel_holds',
          failureId: 'message_failure_cancel_holds'
        })
      };
    },
    apiFailure: response => {
      let messaging;

      if (holdIds.length > 1) {
        messaging = composeMessaging(
          STATUS_TYPES.Failure,
          messagingId || GLOBAL_MESSAGING_ID,
          'message_failure_cancel_holds_one_or_more'
        );
      } else {
        messaging = messagingId
          ? composeFailureMessaging(messagingId, response.error)
          : composeGlobalFailureMessaging(response.error);
      }

      return { messaging };
    },

    postSuccess: () => {
      if (postSuccess) {
        return postSuccess();
      }

      if (shelfState && shelfState.toAdd) {
        return isBatch || metadataIds.length > 1
          ? ShelfActions.batchAddToShelf({
              metadataIds,
              shelfName: shelfState.name
            })
          : ShelfActions.addToShelf({
              metadataId: metadataIds[0],
              shelfToAdd: shelfState.name
            });
      }
      return () => {};
    }
  };
}

export function startPlaceHold({ workflowId, modalKey, metadataId, messagingId }) {
  const determineHoldFlow = (dispatch, getState) => {
    const state = getState();
    const account = selectCurrentAccount(state);
    const library = selectCurrentLibrary(state);
    const policy = state.getIn(['entities', 'bibs', metadataId, 'policy']);
    const materialType = policy.get('materialType');
    const itemLevelHold =
      policy.get('itemLevelHoldableItems') && policy.getIn(['materialPolicy', 'itemLevelHoldsPredetermined']);
    const singleClickHoldsSettings = account
      ? account.get('singleClickHoldsSettings', Immutable.Map())
      : Immutable.Map();
    const accountId = account && account.get('id');
    const requiresExpiryDate = library.get('requiresHoldExpiryDate', false);
    const branches = selectPickupBranches(state);

    if (shouldUseSingleClickHolds(singleClickHoldsSettings, branches, materialType, itemLevelHold)) {
      return dispatch(
        placeHold({
          workflowId,
          accountId,
          metadataId,
          messagingId,
          materialType,
          enableSingleClickHolds: false,
          materialParams: {
            branchId: singleClickHoldsSettings.get('branchId'),
            expiryDate: requiresExpiryDate
              ? moment()
                  .add(singleClickHoldsSettings.get('holdsDurationExpiration'), 's')
                  .format(HOLD_DATE_FORMAT)
              : null
          }
        })
      );
    }

    if (modalKey) {
      return dispatch(openModal(modalKey, { accountRequired: true }));
    }

    const physicalHoldWorkflowView = itemLevelHold ? WORKFLOW_VIEWS.ITEM_LEVEL_HOLD : WORKFLOW_VIEWS.PHYSICAL_HOLD;

    return dispatch(
      WorkflowActions.updateWorkflow(
        workflowId,
        ITEM_TRANSACTION_WORKFLOW,
        Immutable.Map({
          metadataId,
          messagingId,
          step: materialType === MATERIAL_TYPE_PHYSICAL ? physicalHoldWorkflowView : WORKFLOW_VIEWS.DIGITAL_HOLD
        }),
        true,
        true
      )
    );
  };

  determineHoldFlow.middlewareData = {
    authRequired: true,
    accountRequired: true
  };

  return determineHoldFlow;
}

export function openItemLevelHolds({ metadataId }) {
  return {
    metadataId,
    type: HoldsConstants.OPEN_ITEM_LEVEL_HOLDS,
    middlewareData: {
      authRequired: true,
      accountRequired: true
    }
  };
}

export function closeItemLevelHolds({ metadataId }) {
  return {
    metadataId,
    type: HoldsConstants.CLOSE_ITEM_LEVEL_HOLDS
  };
}

export function startCancelHold(workflowId, metadataId, messagingId) {
  return WorkflowActions.updateWorkflow(
    workflowId,
    ITEM_TRANSACTION_WORKFLOW,
    Immutable.Map({
      metadataId,
      step: WORKFLOW_VIEWS.CANCEL_HOLD,
      messagingId
    }),
    true,
    true
  );
}

/**
 * Fetches the Item Groupings for the Hold
 * @param {String} metadataId
 */
export function getItemGroups(metadataId) {
  return {
    payload: {
      id: metadataId
    },
    types: [
      HoldsConstants.FETCH_ITEM_GROUPS_REQUEST,
      HoldsConstants.FETCH_ITEM_GROUPS_SUCCESS,
      HoldsConstants.FETCH_ITEM_GROUPS_FAILURE
    ],
    apiRequest: (state, apiClient) => HoldApi.fetchItemGroups(metadataId, apiClient)
  };
}

export function updatePickupLocation(metadataId, pickupLocation) {
  return {
    payload: {
      id: metadataId,
      pickupLocation
    },
    type: HoldsConstants.UPDATE_PICKUP_LOCATION
  };
}

export function savePickupLocation({ holdId, accountId, branch }) {
  return {
    holdId,
    branch,
    middlewareData: {
      accountRequired: true
    },
    types: [
      HoldsConstants.UPDATE_PICKUP_LOCATION_REQUEST,
      HoldsConstants.UPDATE_PICKUP_LOCATION_SUCCESS,
      HoldsConstants.UPDATE_PICKUP_LOCATION_FAILURE
    ],
    apiRequest: (state, client) =>
      HoldApi.updateHolds(
        {
          holdIds: [holdId],
          accountId,
          location: branch.get('code')
        },
        client
      ),
    apiSuccess: () => ({
      messaging: composeGlobalSuccessMessaging('message_successful_update_pickup_location', {
        values: { location: branch.get('name') }
      })
    })
  };
}

export function fetchHolds({ accountId, size = 25, status, page = 1, sort, materialType }) {
  return {
    types: [HoldsConstants.FETCH_HOLDS_REQUEST, HoldsConstants.FETCH_HOLDS_SUCCESS, HoldsConstants.FETCH_HOLDS_FAILURE],
    middlewareData: {
      accountRequired: true
    },
    apiRequest: (state, apiClient) =>
      HoldApi.getHolds(
        {
          accountId,
          size,
          status: status && status.toUpperCase(),
          page,
          sort,
          materialType
        },
        apiClient
      )
  };
}

export function fetchExpiredHolds({ accountId, page = 1, size = 25 }) {
  return {
    types: [
      HoldsConstants.FETCH_EXPIRED_HOLDS_REQUEST,
      HoldsConstants.FETCH_EXPIRED_HOLDS_SUCCESS,
      HoldsConstants.FETCH_EXPIRED_HOLDS_FAILURE
    ],
    middlewareData: {
      accountRequired: true
    },
    apiRequest: (state, apiClient) =>
      HoldApi.getHolds({ accountId, status: HOLD_STATUS_TYPES.EXPIRED, page, size }, apiClient)
  };
}

export function fetchCancelledHolds({ accountId, page = 1, size = 25 }) {
  return {
    types: [
      HoldsConstants.FETCH_CANCELLED_HOLDS_REQUEST,
      HoldsConstants.FETCH_CANCELLED_HOLDS_SUCCESS,
      HoldsConstants.FETCH_CANCELLED_HOLDS_FAILURE
    ],
    middlewareData: {
      accountRequired: true
    },
    apiRequest: (state, apiClient) =>
      HoldApi.getHolds({ accountId, status: HOLD_STATUS_TYPES.CANCELLED, page, size }, apiClient)
  };
}

const getFirstFailure = response => {
  const failures = response.failures || [];
  if (failures.length > 0) {
    return failures[0].errorResponseDTO || {};
  }

  return null;
};

const getMessageForUpdateHolds = (response, successMessage) => {
  const failure = getFirstFailure(response);

  return failure ? composeGlobalFailureMessaging(failure) : successMessage;
};

export function updateHoldsPauseEndDate({ accountId, holdIds, workflowId, endDate, formattedEndDate }) {
  return {
    holdIds,
    workflowId,
    middlewareData: {
      accountRequired: true
    },
    types: [
      HoldsConstants.UPDATE_PAUSE_HOLDS_DATE_REQUEST,
      HoldsConstants.UPDATE_PAUSE_HOLDS_DATE_SUCCESS,
      HoldsConstants.UPDATE_PAUSE_HOLDS_DATE_FAILURE
    ],
    apiRequest: (state, client) =>
      HoldApi.updateHolds(
        {
          holdIds,
          accountId,
          suspended: {
            status: true,
            endDate
          }
        },
        client
      ),
    apiSuccess: ({ failures }) => {
      const messaging = composeMessagingForBatchAction({
        total: holdIds.length,
        failures,
        successId: 'message_successful_update_pause_end_date',
        mixedId: 'message_mixed_update_date',
        failureId: 'message_failure_update_date',
        values: { date: formattedEndDate }
      });

      return {
        messaging
      };
    },
    apiFailure: () => ({
      messaging: composeMessaging(STATUS_TYPES.Failure, GLOBAL_MESSAGING_ID, 'message_failure_update_date', {
        values: { count: holdIds.length }
      })
    })
  };
}

export function pauseOrResumeHolds({ accountId, holdIds, workflowId, suspended }) {
  return {
    holdIds,
    workflowId,
    suspended,
    middlewareData: {
      accountRequired: true
    },
    types: [
      HoldsConstants.UPDATE_PAUSE_HOLDS_REQUEST,
      HoldsConstants.UPDATE_PAUSE_HOLDS_SUCCESS,
      HoldsConstants.UPDATE_PAUSE_HOLDS_FAILURE
    ],
    apiRequest: (state, client) =>
      HoldApi.updateHolds(
        {
          holdIds,
          accountId,
          suspended
        },
        client
      ),
    apiSuccess: ({ failures }) => {
      const action = suspended.status === true ? 'pause' : 'resume';
      const messaging = composeMessagingForBatchAction({
        total: holdIds.length,
        failures,
        successId: `message_successful_${action}_holds`,
        mixedId: `message_mixed_${action}_holds`,
        failureId: `message_failure_${action}_holds`
      });

      return {
        messaging
      };
    }
  };
}

export function updateHoldsExpiryDate({ accountId, holdIds, workflowId, expiryDate, formattedExpiryDate }) {
  return {
    holdIds,
    workflowId,
    middlewareData: {
      accountRequired: true
    },
    types: [
      HoldsConstants.UPDATE_HOLDS_EXPIRY_REQUEST,
      HoldsConstants.UPDATE_HOLDS_EXPIRY_SUCCESS,
      HoldsConstants.UPDATE_HOLDS_EXPIRY_FAILURE
    ],
    apiRequest: (state, client) =>
      HoldApi.updateHolds(
        {
          holdIds,
          accountId,
          expiryDate
        },
        client
      ),
    apiSuccess: response => {
      const successMessage = composeGlobalSuccessMessaging('message_successful_update_expiry_date', {
        values: { date: formattedExpiryDate }
      });

      return {
        messaging: getMessageForUpdateHolds(response, successMessage)
      };
    }
  };
}

export default {
  placeHold,
  placeItemHold,
  cancelHold,
  startPlaceHold,
  startCancelHold,
  openItemLevelHolds,
  closeItemLevelHolds,
  getItemGroups,
  updatePickupLocation,
  fetchHolds,
  fetchExpiredHolds,
  fetchCancelledHolds,
  updateHoldsPauseEndDate,
  pauseOrResumeHolds,
  updateHoldsExpiryDate
};
