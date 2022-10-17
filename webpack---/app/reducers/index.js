import Immutable from 'immutable';

import cards from './cards';
import catalogBibs from './catalogBibs';
import search from './search';
import shelves from './shelves';
import ugc from './ugc';
import preview from './preview';
import borrowing from './borrowing';
import ui from './ui';
import entities from './entities';
import errors from './errors';
import events from './events';
import bibs from './bibs';
import movies from './movies';
import lists from './lists';
import locations from './locations';

import app from './AppReducer';
import analytics from './AnalyticsReducer';
import auth from './AuthReducer';
import availabilityDetail from './AvailabilityDetailReducer';
import drawer from './DrawerReducer';
import branding from './BrandingReducer';
import library from './LibraryReducer';
import localization from './LocalizationReducer';
import recommendation from './RecommendationReducer';
import templates from './TemplatesReducer';
import user from './UserReducer';
import featureTogglz from './FeatureTogglzReducer';
import redirect from './RedirectReducer';
import suggestForPurchase from './suggestForPurchase';

export default Immutable.Map({
  cards,
  catalogBibs,
  entities,
  errors,
  events,
  movies,
  search,
  shelves,
  preview,
  ui,
  borrowing,
  ugc,
  bibs,
  suggestForPurchase,
  app,
  availabilityDetail,
  auth,
  analytics,
  drawer,
  branding,
  library,
  lists,
  locations,
  localization,
  recommendation,
  templates,
  redirect,
  user,
  featureTogglz
});
