import _ from 'lodash';
import Immutable from 'immutable';
import { addToShelf as addToShelfGA } from '@bibliocommons/ga-event-templates';
import { selectUGCListForCurrentUser } from 'app/selectors/ugc/UGCBaseSelector';
import ShelfApi from '../api/ShelfApi';
import ShelfConstants from '../constants/ShelfConstants';
import { selectBibEntities } from '../selectors/EntitiesSelector';
import composeGlobalSuccessMessaging from '../helpers/messaging/composeGlobalSuccessMessaging';
import composeGlobalFailureMessaging from '../helpers/messaging/composeGlobalFailureMessaging';
import addFieldToResponseAnalytics from '../helpers/analytics/addFieldToResponseAnalytics';

function shelfItemPrivacyStatus(response, store) {
  const isShelfItemPrivate = _.values(response.entities.shelves[store.getState().getIn(['auth', 'currentUserId'])]).map(
    shelfItem => shelfItem.privateItem
  )[0];

  return isShelfItemPrivate && isShelfItemPrivate ? 'private' : 'public';
}

function handleAddToShelfSuccess({ response, store, reciprocalRank, shelfToAdd, metadataId }) {
  const messageId = `success_shelf_added_${shelfItemPrivacyStatus(response, store)}`;
  const augmentedResponse = reciprocalRank
    ? {
        payload: addFieldToResponseAnalytics(response, 'reciprocalRank', reciprocalRank)
      }
    : {};
  const values = { shelfName: shelfToAdd };
  return {
    ...augmentedResponse,
    messaging: composeGlobalSuccessMessaging(messageId, {
      values,
      actionButtonType: 'PrivacySettingsButton',
      actionButtonProps: { metadataId }
    })
  };
}

function handleAddToShelfFailure({ response, store, metadataId }) {
  const bibs = selectBibEntities(store.getState());
  const values = {
    title: bibs.getIn([metadataId, 'briefInfo', 'title'], '')
  };

  return {
    messaging: composeGlobalFailureMessaging(response.error, { values })
  };
}

function searchUserShelf(shelfName, userId, query) {
  return {
    types: [
      ShelfConstants.SHELF_SEARCH_REQUEST,
      ShelfConstants.SHELF_SEARCH_SUCCESS,
      ShelfConstants.SHELF_SEARCH_FAILURE
    ],
    apiRequest: (state, client) =>
      ShelfApi.searchUserShelf(
        {
          shelfName,
          userId,
          ...query
        },
        client
      )
  };
}

function fetchAdditionalFilters(shelfName, userId, fieldId, query) {
  return {
    types: [
      ShelfConstants.FETCH_FILTERS_REQUEST,
      ShelfConstants.FETCH_FILTERS_SUCCESS,
      ShelfConstants.FETCH_FILTERS_FAILURE
    ],
    apiRequest: (state, client) =>
      ShelfApi.fetchAdditionalFilters(
        {
          shelfName,
          userId,
          fieldId,
          ...query
        },
        client
      )
  };
}

function importILSBibs(shelfName, accountId) {
  return {
    types: [
      ShelfConstants.IMPORT_ILS_BIBS_REQUEST,
      ShelfConstants.IMPORT_ILS_BIBS_SUCCESS,
      ShelfConstants.IMPORT_ILS_BIBS_FAILURE
    ],
    middlewareData: {
      authRequired: true
    },
    apiRequest: (state, client) => ShelfApi.importILSBibs(shelfName, accountId, client)
  };
}

// TODO SHEL-191: Eventually remove isBatch conditional and always pass
// shelfItem in array and remove ShelfApi.updateShelfItem
function updateShelfItems({
  shelfName,
  newShelfName,
  shelfItemIds,
  metadataIds,
  postSuccess,
  isBatch = false,
  messageId,
  ...fieldsToUpdate
}) {
  return {
    isBatch,
    metadataIds,
    postSuccess,
    fields: fieldsToUpdate,
    types: [
      ShelfConstants.UPDATE_SHELF_ITEM_REQUEST,
      ShelfConstants.UPDATE_SHELF_ITEM_SUCCESS,
      ShelfConstants.UPDATE_SHELF_ITEM_FAILURE
    ],
    middlewareData: {
      authRequired: true
    },
    apiRequest: (state, client) => {
      if (isBatch) {
        return ShelfApi.updateShelfItems(
          {
            shelfName,
            newShelfName,
            metadataIds,
            shelfItemIds,
            privateItem: fieldsToUpdate.privateItem
          },
          client
        );
      }

      return ShelfApi.updateShelfItem(
        {
          shelfName,
          shelf: newShelfName,
          shelfItemId: shelfItemIds[0],
          userId: state.getIn(['auth', 'currentUserId']),
          ...fieldsToUpdate
        },
        client
      );
    },
    apiSuccess: () => {
      let successMessage;
      const messagingOpts = {
        values: {
          count: shelfItemIds.length,
          shelfName: newShelfName
        }
      };

      if (!isBatch) {
        messagingOpts.actionButtonType = 'PrivacySettingsButton';
        messagingOpts.actionButtonProps = { metadataId: metadataIds[0] };
      }

      if (newShelfName === shelfName) {
        successMessage = fieldsToUpdate.privateItem
          ? composeGlobalSuccessMessaging('success_shelf_marked_private', messagingOpts)
          : composeGlobalSuccessMessaging('success_shelf_marked_public', messagingOpts);
      } else {
        successMessage = messageId
          ? composeGlobalSuccessMessaging(messageId, messagingOpts)
          : composeGlobalSuccessMessaging('success_shelf_moved', messagingOpts);
      }
      return { messaging: successMessage };
    }
  };
}

function removeShelfItems({ shelfName, shelfItemIds, metadataIds, workflowId, postSuccess, isBatch = false }) {
  return {
    isBatch,
    workflowId,
    metadataIds,
    postSuccess,
    types: [
      ShelfConstants.REMOVE_FROM_SHELF_REQUEST,
      ShelfConstants.REMOVE_FROM_SHELF_SUCCESS,
      ShelfConstants.REMOVE_FROM_SHELF_FAILURE
    ],
    middlewareData: {
      authRequired: true
    },
    apiRequest: (state, client) =>
      ShelfApi.removeFromShelf(
        {
          shelfName,
          shelfItemIds,
          metadataIds,
          userId: state.getIn(['auth', 'currentUserId'])
        },
        client
      ),
    apiSuccess: (response, store) => {
      // Make a map of current user's ugc of the following shape:
      // {
      //   quotations: {
      //     <metadataId>: [
      //       {id: 123, quotation: "text"},
      //       {id: 456, quotation: "text2"}
      //     ]
      //   },
      //   comments: ...
      // }
      const existingUgc = [
        'comments',
        'quotations',
        'summaries',
        'ratings',
        'videos',
        'iOwnThis',
        'similarTitles',
        'privateNotes',
        'contentAdvisories',
        'ageSuitabilities',
        'tags'
      ].reduce(
        (acc, ugcType) => acc.set(ugcType, selectUGCListForCurrentUser(ugcType)(store.getState())),
        Immutable.Map()
      );

      // Make a map with ids of ugc to delete of the following shape:
      // {
      //   quotations: [123, 456],
      //   comments: ...
      // }
      const existingUgcIds = existingUgc.map(ugc =>
        metadataIds.reduce(
          (acc, metadataId) => acc.concat(ugc.get(metadataId, Immutable.List()).map(k => k.get('id'))),
          Immutable.List()
        )
      );

      // Make an array of strings to delete of the following shape:
      // ['ugc.quotations.131762237',  ...]
      const deletedUgcEntities = existingUgcIds
        .reduce((acc, ids, ugcType) => acc.concat(ids.map(id => `ugc.${ugcType}.${id}`)), Immutable.List())
        .toJS();

      return {
        deletedEntities: [
          ...deletedUgcEntities,
          ...shelfItemIds.map(itemId => `shelves.${store.getState().getIn(['auth', 'currentUserId'])}.${itemId}`)
        ],
        messaging: isBatch
          ? composeGlobalSuccessMessaging('message_successful_batch_remove_shelves')
          : composeGlobalSuccessMessaging('success_shelf_remove')
      };
    },
    apiFailure: ({ error }) => ({
      messaging: isBatch ? composeGlobalFailureMessaging(error) : null
    })
  };
}

/**
 * Adds ONE bib to the specified shelf
 * @param {String} metadataId Bib to add
 * @param {String} shelfToAdd Name of the shelf to add to
 */
function addToShelf({ metadataId, shelfToAdd, postSuccess = () => null, reciprocalRank }) {
  return {
    metadataIds: [metadataId],
    postSuccess,
    types: [
      ShelfConstants.ADD_TO_SHELF_REQUEST,
      ShelfConstants.ADD_TO_SHELF_SUCCESS,
      ShelfConstants.ADD_TO_SHELF_FAILURE
    ],
    middlewareData: {
      authRequired: true,
      gaEvent: addToShelfGA(shelfToAdd)
    },
    apiRequest: (state, client) =>
      ShelfApi.addToShelf(
        {
          metadataIds: [metadataId],
          shelfName: shelfToAdd,
          userId: state.getIn(['auth', 'currentUserId'])
        },
        client
      ),
    apiSuccess: (response, store) =>
      handleAddToShelfSuccess({ response, store, reciprocalRank, shelfToAdd, metadataId }),
    apiFailure: (response, store) => handleAddToShelfFailure({ response, store, metadataId })
  };
}

/**
 * Adds multiple bibs to the specified shelf
 * @param {String} metadataId Bib to add
 * @param {String} shelfName Name of the shelf to add to
 */
function batchAddToShelf({ metadataIds, shelfName }) {
  return {
    isBatch: true,
    metadataIds,
    types: [
      ShelfConstants.ADD_TO_SHELF_REQUEST,
      ShelfConstants.ADD_TO_SHELF_SUCCESS,
      ShelfConstants.ADD_TO_SHELF_FAILURE
    ],
    middlewareData: {
      authRequired: true,
      gaEvent: addToShelfGA(shelfName)
    },
    apiRequest: (state, client) =>
      ShelfApi.addToShelf(
        {
          metadataIds,
          shelfName,
          userId: state.getIn(['auth', 'currentUserId'])
        },
        client
      ),
    apiSuccess: (response, store) => ({
      messaging: composeGlobalSuccessMessaging(
        `message_successful_batch_add_to_shelf_${shelfName}_${shelfItemPrivacyStatus(response, store)}`
      )
    })
  };
}

/**
 * Displays the post-add to shelf view for an existing shelf item
 * @param {String}
 */
function showPostAddToShelfView(metadataId, shelf, workflowId) {
  return {
    id: metadataId,
    workflowId,
    type: ShelfConstants.SHOW_POST_ADD_TO_SHELF_VIEW,
    payload: {
      id: metadataId,
      existsOnShelf: true
    },
    shelf
  };
}

export default {
  addToShelf,
  batchAddToShelf,
  updateShelfItems,
  removeShelfItems,
  searchUserShelf,
  importILSBibs,
  fetchAdditionalFilters,
  showPostAddToShelfView
};
