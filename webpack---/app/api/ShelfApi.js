function addToShelf(data, apiClient) {
  const route = apiClient.route`/libraries/${':librarySubdomain'}/shelves/`;
  return apiClient.post(route, data);
}

function removeFromShelf({ shelfName, ...data }, apiClient) {
  const route = apiClient.route`/libraries/${':librarySubdomain'}/shelves/${shelfName}`;
  return apiClient.delete(route, data);
}

function searchUserShelf({ shelfName, ...query }, apiClient) {
  const route = apiClient.route`/libraries/${':librarySubdomain'}/shelves/${shelfName}`;
  return apiClient.get(route, { query });
}

function fetchAdditionalFilters({ shelfName, fieldId, ...query }, apiClient) {
  const route = apiClient.route`/libraries/${':librarySubdomain'}/shelves/${shelfName}/fields/${fieldId}`;
  return apiClient.get(route, { query });
}

// TODO SHEL-191: remove this depricated call
function updateShelfItem({ shelfItemId, shelfName, ...data }, apiClient) {
  const route = apiClient.route`/libraries/${':librarySubdomain'}/shelves/${shelfName}/${shelfItemId}`;
  return apiClient.patch(route, data);
}

function updateShelfItems({ shelfName, newShelfName, privateItem, metadataIds, shelfItemIds }, apiClient) {
  const route = apiClient.route`/libraries/${':librarySubdomain'}/shelves/${shelfName}/items`;
  return apiClient.patch(route, {
    newShelfName,
    privateItem,
    metadataIds,
    shelfItemIds
  });
}

function importILSBibs(shelfName, accountId, apiClient) {
  const route = apiClient.route`/libraries/${':librarySubdomain'}/shelves/${shelfName}/import`;
  return apiClient.post(route, { accountId });
}

export default {
  addToShelf,
  removeFromShelf,
  searchUserShelf,
  fetchAdditionalFilters,
  updateShelfItem,
  updateShelfItems,
  importILSBibs
};
