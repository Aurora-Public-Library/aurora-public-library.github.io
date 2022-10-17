function placeHold(data, apiClient) {
  const route = apiClient.route`/libraries/${':librarySubdomain'}/holds`;
  return apiClient.post(route, data);
}

function cancelHold(data, apiClient) {
  const route = apiClient.route`/libraries/${':librarySubdomain'}/holds`;
  return apiClient.delete(route, data);
}

function fetchItemGroups(metadataId, apiClient) {
  const route = apiClient.route`/libraries/${':librarySubdomain'}/bibs/item_groups/${metadataId}`;
  return apiClient.get(route);
}

function getHolds(query, apiClient) {
  const route = apiClient.route`/libraries/${':librarySubdomain'}/holds`;
  return apiClient.get(route, { query });
}

function updateHolds({ holdIds, messagingId, accountId, suspended, expiryDate, location }, apiClient) {
  const route = apiClient.route`/libraries/${':librarySubdomain'}/holds`;
  return apiClient.patch(route, {
    holdIds,
    messagingId,
    accountId,
    suspended,
    location,
    expiryDate
  });
}

export default {
  placeHold,
  cancelHold,
  fetchItemGroups,
  getHolds,
  updateHolds
};
