import { createReduxConstants } from '@bibliocommons/utils-redux';

export const TAG_SUMMARIES_SIZE = 999;

export const TAG_TYPES = {
  GENRE: 'genre',
  PERSONAL: 'personal',
  MOOD: 'mood',
  SUBJECT: 'subject'
};

export default createReduxConstants('TAGS', {
  ADD_TAG_REQUEST: null,
  ADD_TAG_SUCCESS: null,
  ADD_TAG_FAILURE: null,
  REMOVE_TAG_REQUEST: null,
  REMOVE_TAG_SUCCESS: null,
  REMOVE_TAG_FAILURE: null,
  FETCH_TAG_SUMMARIES_REQUEST: null,
  FETCH_TAG_SUMMARIES_SUCCESS: null,
  FETCH_TAG_SUMMARIES_FAILURE: null
});
