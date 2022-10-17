function addFieldToEvent(event, field, value) {
  return {
    ...event,
    payload: {
      ...event.payload,
      [field]: value
    }
  };
}

export default function addFieldToResponseAnalytics(response, field, value) {
  const { analytics } = response;

  if (!analytics || !analytics.events || analytics.events.length === 0) {
    return response;
  }

  const events = analytics.events.map(event => addFieldToEvent(event, field, value));

  return {
    ...response,
    analytics: { ...analytics, events }
  };
}
