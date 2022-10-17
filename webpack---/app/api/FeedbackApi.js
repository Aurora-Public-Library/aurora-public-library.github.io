function submitFeedback(feedbackData, apiClient) {
  const route = apiClient.route`/libraries/${':librarySubdomain'}/feedback`;
  return apiClient.post(route, feedbackData);
}

function submitGroupSearchFeedback(feedbackData, apiClient) {
  const route = apiClient.route`/libraries/${':librarySubdomain'}/feedback/groupsearch`;
  return apiClient.post(route, feedbackData);
}

export default {
  submitFeedback,
  submitGroupSearchFeedback
};
