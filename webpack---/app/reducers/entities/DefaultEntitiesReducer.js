import Immutable from 'immutable';

function merger(a, b) {
  if (a && a.mergeWith && !Immutable.List.isList(a) && !Immutable.List.isList(b)) {
    return a.mergeWith(merger, b);
  }
  return b;
}

export default function createEntitiesReducer(key, deep = false) {
  const initialState = Immutable.Map();

  return function entityReducer(state = initialState, action) {
    const payload = action.payload || {};
    const entities = action.entities || payload.entities;
    const deletedEntities = action.deletedEntities || payload.deletedEntities;

    if (entities || deletedEntities) {
      let updated = state;
      if (deletedEntities) {
        deletedEntities.forEach(entityPath => {
          const [rootKey, ...path] = entityPath.split('.');
          if (rootKey === key) {
            updated = updated.deleteIn(path);
          }
        });
      }

      if (entities && entities[key]) {
        // Use shallow merge by default, and use deep merge for a few entities which have
        // nested structures (eg. ugc) or may have partial data from the gateway (eg. bibs).
        updated = deep ? updated.mergeWith(merger, entities[key]) : updated.merge(entities[key]);
      }
      return updated;
    }

    return state;
  };
}
