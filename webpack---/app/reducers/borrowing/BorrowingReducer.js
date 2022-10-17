import Immutable from 'immutable';
import _ from 'lodash';

const initialState = Immutable.fromJS({
  summaries: {
    holds: {},
    inactiveHolds: {},
    checkedout: {},
    fines: {},
    interlibraryLoans: {}
  }
});

export default function borrowing(state = initialState, action) {
  const summaries = _.get(action, 'payload.borrowing.summaries', false);

  if (summaries) {
    let updatedSummaries = state.get('summaries', Immutable.Map());

    Object.keys(summaries).forEach(
      summaryType => (updatedSummaries = updatedSummaries.set(summaryType, Immutable.fromJS(summaries[summaryType])))
    );

    return state.set('summaries', updatedSummaries);
  }

  return state;
}
