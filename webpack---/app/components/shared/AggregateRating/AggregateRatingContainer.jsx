import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { selectBibEntities } from 'app/selectors/EntitiesSelector';
import AggregateRating from './AggregateRating';

export class AggregateRatingContainer extends React.PureComponent {
  render() {
    return <AggregateRating {...this.props} />;
  }
}

AggregateRatingContainer.propTypes = {
  rating: PropTypes.number,
  count: PropTypes.number,
  metadataId: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const bib = selectBibEntities(state).get(ownProps.metadataId, Immutable.Map());
  return {
    rating: bib.getIn(['briefInfo', 'rating', 'averageRating'], 0),
    count: bib.getIn(['briefInfo', 'rating', 'totalCount'], 0)
  };
};

export default connect(mapStateToProps)(AggregateRatingContainer);
