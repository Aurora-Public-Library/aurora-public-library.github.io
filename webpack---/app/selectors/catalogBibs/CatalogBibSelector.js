import Immutable from 'immutable';
import { createSelector } from 'reselect';
import { selectCatalogBibEntities } from '../EntitiesSelector';

const getCurrentBibId = state => state.getIn(['catalogBibs', 'catalogBib', 'id'], Immutable.Map());

export const selectCatalogBib = createSelector([selectCatalogBibEntities, getCurrentBibId], (catalogBibs, id) =>
  catalogBibs.get(id)
);

export const createBibFieldSelector = (category, fieldName) =>
  createSelector([selectCatalogBib], catalogBib => {
    const items = catalogBib
      ?.get('fields', Immutable.List())
      .find(fieldSet => fieldSet.get('category') === category, null, Immutable.Map())
      .get('items', Immutable.List());

    return fieldName ? items.find(fieldSet => fieldSet.get('fieldName') === fieldName) : items;
  });

export default {
  selectCatalogBib,
  createBibFieldSelector
};
