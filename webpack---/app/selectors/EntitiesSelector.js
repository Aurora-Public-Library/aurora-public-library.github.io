import Immutable from 'immutable';
import { createSelector } from 'reselect';

export const selectBibEntities = createSelector(
  [state => state.getIn(['entities', 'bibs'], Immutable.Map())],
  bibs => bibs
);

export const selectCatalogBibEntities = createSelector(
  [state => state.getIn(['entities', 'catalogBibs'], Immutable.Map())],
  bibs => bibs
);

export const selectReviewEntities = createSelector(
  [state => state.getIn(['entities', 'reviews'], Immutable.Map())],
  bibs => bibs
);

export const selectListEntities = createSelector(
  [state => state.getIn(['entities', 'lists'], Immutable.Map())],
  bibs => bibs
);

export const selectListItemEntities = createSelector(
  [state => state.getIn(['entities', 'listItems'], Immutable.Map())],
  bibs => bibs
);

export const selectUserEntities = createSelector(
  [state => state.getIn(['entities', 'users'], Immutable.Map())],
  bibs => bibs
);

export const selectAuthorNoteEntities = createSelector(
  [state => state.getIn(['entities', 'authorNotes'], Immutable.Map())],
  bibs => bibs
);

export const selectAuthorSuggestionEntities = createSelector(
  [state => state.getIn(['entities', 'authorSuggestions'], Immutable.Map())],
  bibs => bibs
);

export const selectBibItemEntities = createSelector(
  [state => state.getIn(['entities', 'bibItems'], Immutable.Map())],
  bibItems => bibItems
);

export const selectAvailabilityEntities = createSelector(
  [state => state.getIn(['entities', 'availabilities'], Immutable.Map())],
  availabilities => availabilities
);

export const selectSubscriptionEntities = createSelector(
  [state => state.getIn(['entities', 'subscriptions'], Immutable.Map())],
  subscriptions => subscriptions
);

export const selectHoldingEntities = createSelector(
  [state => state.getIn(['entities', 'holdings'], Immutable.Map())],
  holdings => holdings
);

export const selectRelatedAuthorEntities = createSelector(
  [state => state.getIn(['entities', 'relatedAuthors'], Immutable.Map())],
  bibs => bibs
);

export const selectSeriesEntryEntities = createSelector(
  [state => state.getIn(['entities', 'seriesEntries'], Immutable.Map())],
  bibs => bibs
);

export const selectMediaSummaryEntities = createSelector(
  [state => state.getIn(['entities', 'mediaSummaries'], Immutable.Map())],
  mediaSummaries => mediaSummaries
);

export const selectExcerptEntities = createSelector(
  [state => state.getIn(['entities', 'excerpts'], Immutable.Map())],
  excerpts => excerpts
);

export const selectMarcFieldEntities = createSelector(
  [state => state.getIn(['entities', 'marcFields'], Immutable.Map())],
  marcFields => marcFields
);

export const selectOnlineResourcesEntities = createSelector(
  [state => state.getIn(['entities', 'externalResources'], Immutable.Map())],
  externalResources => externalResources
);

export const selectLiteSuggestionEntities = createSelector(
  [state => state.getIn(['entities', 'suggestForPurchase', 'liteSuggestions'], Immutable.List())],
  liteSuggestions => liteSuggestions
);

export const selectPremiumSuggestionEntities = createSelector(
  [state => state.getIn(['entities', 'suggestForPurchase', 'premiumSuggestions'], Immutable.List())],
  premiumSuggestions => premiumSuggestions
);

// UGC
export const selectContentNoticeEntities = createSelector(
  [state => state.getIn(['entities', 'ugc', 'contentAdvisories'], Immutable.Map())],
  contentAdvisories => contentAdvisories
);

export const selectCommentEntities = createSelector(
  [state => state.getIn(['entities', 'ugc', 'comments'], Immutable.Map())],
  bibs => bibs
);

export const selectQuotationEntities = createSelector(
  [state => state.getIn(['entities', 'ugc', 'quotations'], Immutable.Map())],
  bibs => bibs
);

export const selectSummaryEntities = createSelector(
  [state => state.getIn(['entities', 'ugc', 'summaries'], Immutable.Map())],
  bibs => bibs
);

export const selectVideoEntities = createSelector(
  [state => state.getIn(['entities', 'ugc', 'videos'], Immutable.Map())],
  bibs => bibs
);

export const selectFlagEntities = createSelector(
  [state => state.getIn(['entities', 'ugc', 'flags'], Immutable.Map())],
  bibs => bibs
);

export const selectLikeEntities = createSelector(
  [state => state.getIn(['entities', 'ugc', 'likes'], Immutable.Map())],
  bibs => bibs
);

export const selectHoldableItemEntities = createSelector(
  [state => state.getIn(['entities', 'holdableItems'], Immutable.Map())],
  holdableItems => holdableItems
);

export const selectEventEntities = createSelector(
  [state => state.getIn(['entities', 'events'], Immutable.Map())],
  events => events
);

export const selectEventAudienceEntities = createSelector(
  [state => state.getIn(['entities', 'eventAudiences'], Immutable.Map())],
  eventAudiences => eventAudiences
);

export const selectEventTypesEntities = createSelector(
  [state => state.getIn(['entities', 'eventTypes'], Immutable.Map())],
  eventTypes => eventTypes
);

export const selectEventSeriesEntities = createSelector(
  [state => state.getIn(['entities', 'eventSeries'], Immutable.Map())],
  eventSeries => eventSeries
);

export const selectEventProgramsEntities = createSelector(
  [state => state.getIn(['entities', 'eventPrograms'], Immutable.Map())],
  eventPrograms => eventPrograms
);

export const selectEventLanguagesEntities = createSelector(
  [state => state.getIn(['entities', 'eventLanguages'], Immutable.Map())],
  eventLanguages => eventLanguages
);

export const selectLocationEntities = createSelector(
  [state => state.getIn(['entities', 'locations'], Immutable.Map())],
  locations => locations
);

export const selectFacilityTypeEntities = createSelector(
  [state => state.getIn(['entities', 'facilityTypes'], Immutable.Map())],
  facilityTypes => facilityTypes
);

export const selectSpecialHoursEntities = createSelector(
  [state => state.getIn(['entities', 'specialHours'], Immutable.Map())],
  specialHours => specialHours
);

export const selectPlaceEntities = createSelector(
  [state => state.getIn(['entities', 'places'], Immutable.Map())],
  places => places
);

export const selectImageEntities = createSelector(
  [state => state.getIn(['entities', 'images'], Immutable.Map())],
  images => images
);

export const selectCardEntities = createSelector(
  [state => state.getIn(['entities', 'cards'], Immutable.Map())],
  cards => cards
);

export const selectPromoEntities = createSelector(
  [state => state.getIn(['entities', 'promos'], Immutable.Map())],
  promos => promos
);

export const selectLibraryEntities = createSelector(
  [state => state.getIn(['entities', 'libraries'], Immutable.Map())],
  libraries => libraries
);
