import Immutable from 'immutable';
import { combineReducers } from 'redux-immutablejs';

import comment from './CommentReducer';
import comments from './CommentsReducer';
import quotation from './QuotationReducer';
import quotations from './QuotationsReducer';
import summary from './SummaryReducer';
import summaries from './SummariesReducer';
import video from './VideoReducer';
import videos from './VideosReducer';
import commentsTransactions from './CommentsTransactionsReducer';
import quotationsTransactions from './QuotationsTransactionsReducer';
import ratingsTransactions from './RatingsTransactionsReducer';
import tagsTransactions from './TagsTransactionsReducer';
import videosTransactions from './VideosTransactionsReducer';
import iOwnThisTransactions from './IOwnThisTransactionsReducer';
import similarTitlesTransactions from './SimilarTitlesTransactionsReducer';
import privateNotesTransactions from './PrivateNotesTransactionsReducer';
import contentAdvisories from './ContentAdvisoriesReducer';
import contentAdvisoriesTransactions from './ContentAdvisoriesTransactionsReducer';
import ageSuitabilitiesTransactions from './AgeSuitabilitiesTransactionsReducer';
import summariesTransactions from './SummariesTransactionsReducer';
import tags from './TagsReducer';
import flagsTransactions from './FlagsTransactionsReducer';
import likesTransactions from './LikesTransactionsReducer';
import likes from './LikesReducer';

export default combineReducers(
  Immutable.Map({
    comment,
    comments,
    quotation,
    quotations,
    summary,
    summaries,
    video,
    videos,
    commentsTransactions,
    quotationsTransactions,
    ratingsTransactions,
    tagsTransactions,
    videosTransactions,
    iOwnThisTransactions,
    similarTitlesTransactions,
    privateNotesTransactions,
    contentAdvisories,
    contentAdvisoriesTransactions,
    ageSuitabilitiesTransactions,
    summariesTransactions,
    tags,
    flagsTransactions,
    likesTransactions,
    likes
  })
);
