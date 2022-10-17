import { createReduxConstants } from '@bibliocommons/utils-redux';

// The Movie DB
export const MOVIE_DB_API_KEY = 'fe97419534c50ea576662f79d2d02b66';
export const MOVIE_DB_API_URL = 'https://api.themoviedb.org/3';
export const MOVIE_DB_IMG_BASE_PATH = 'https://image.tmdb.org/t/p/original';
export const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed';

export default createReduxConstants('MOVIES', {
  GET_MOVIE_BY_TITLE_REQUEST: null,
  GET_MOVIE_BY_TITLE_SUCCESS: null,
  GET_MOVIE_BY_TITLE_FAILURE: null
});
