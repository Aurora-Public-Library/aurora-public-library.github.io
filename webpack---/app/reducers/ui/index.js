import Immutable from 'immutable';
import { combineReducers } from 'redux-immutablejs';

import feedback from './FeedbackReducer';
import fullScreenOverlay from './FullScreenOverlayReducer';
import itemTransactions from './ItemTransactionReducer';
import itemLevelHold from './ItemLevelHoldReducer';
import listPresentation from './ListPresentationReducer';
import messaging from './MessagingReducer';
import progressBar from './ProgressBarReducer';
import savedSearch from './SavedSearchReducer';
import stackMap from './StackMapReducer';
import notices from './NoticesReducer';
import workflow from './WorkflowReducer';
import groupSearchFeedback from './GroupSearchFeedbackReducer';
import accountMessages from './AccountMessagesReducer';
import modal from './ModalReducer';
import openUgcEditors from './UgcEditorReducer';
import contentWarnings from './ContentWarningsReducer';

export default combineReducers(
  Immutable.Map({
    feedback,
    fullScreenOverlay,
    itemTransactions,
    workflow,
    messaging,
    listPresentation,
    progressBar,
    savedSearch,
    stackMap,
    notices,
    groupSearchFeedback,
    itemLevelHold,
    accountMessages,
    modal,
    openUgcEditors,
    contentWarnings
  })
);
