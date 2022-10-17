import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { RatingStars } from '@bibliocommons/rating';

import './AggregateRating.scss';

export default function AggregateRating({ count, rating }) {
  const screenReaderLabel = (
    <FormattedMessage id="aggregate_ratings_count_sr_label" values={{ rating: rating / 20, count }} />
  );
  return (
    <span className="cp-aggregate-rating">
      <RatingStars className="rating-stars" rating={rating} screenReaderLabel={screenReaderLabel} />
      <span className="rating-count" aria-hidden>
        (<FormattedMessage id="aggregate_ratings_count" values={{ count }} />)
      </span>
    </span>
  );
}

AggregateRating.propTypes = {
  count: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired
};
