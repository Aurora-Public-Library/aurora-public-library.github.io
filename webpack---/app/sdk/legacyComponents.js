import loadable from '@loadable/component';

export const IntlWrapper = loadable(() => import('./IntlWrapper'));

// Carousels
export const BaseCarousel = loadable(() => import('@bibliocommons/carousel-base'), {
  resolveComponent: imported => imported.default.BaseCarousel
});
export const LocalizedCatalogueCarousel = loadable(() => import('@bibliocommons/catalogue-carousel'), {
  resolveComponent: imported => imported.LocalizedCatalogueCarousel
});
export const HtmlCarousel = loadable(() => import('@bibliocommons/html-carousel'));
export const ListCarousel = loadable(() => import('@bibliocommons/list-carousel'));
export const CatalogueCarousel = loadable(() => import('@bibliocommons/catalogue-carousel'));
export const RatingCard = loadable(() => import('@bibliocommons/rating-card'));

// Lists
export const UserListVisibilityLabel = loadable(() => import('app/components/lists'), {
  resolveComponent: imported => imported.VisibilityLabel
});
export const UserListStatusBanner = loadable(() => import('app/components/lists'), {
  resolveComponent: imported => imported.StatusBanner
});
export const UserListForm = loadable(() => import('app/components/lists'), {
  resolveComponent: imported => imported.ListForm
});
export const UserListJacketCover = loadable(() => import('app/components/lists'), {
  resolveComponent: imported => imported.ListJacketCover
});
