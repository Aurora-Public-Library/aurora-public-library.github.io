import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FeedbackActions from 'app/actions/FeedbackActions';
import { selectCurrentUser } from 'app/selectors/AuthSelector';
import { selectCurrentLibrary } from 'app/selectors/LibrarySelector';
import FeedbackBox from './FeedbackBox';

const FeedbackBoxContainer = ({
  user,
  enabled,
  actions,
  categories,
  contactLinks,
  expanded,
  selectedCategory,
  isSubmitting,
  suggestForPurchaseEnabled
}) =>
  user && enabled ? (
    <FeedbackBox
      actions={actions}
      categories={categories}
      contactLinks={contactLinks}
      expanded={expanded}
      selectedCategory={selectedCategory}
      isSubmitting={isSubmitting}
      suggestForPurchaseEnabled={suggestForPurchaseEnabled}
    />
  ) : null;

const mapStateToProps = state => {
  const user = selectCurrentUser(state);
  const library = selectCurrentLibrary(state);
  return {
    user,
    enabled: library.getIn(['feedback', 'enabled']),
    categories: library.getIn(['feedback', 'categories']),
    contactLinks: library.getIn(['feedback', 'links']),
    expanded: state.getIn(['ui', 'feedback', 'expanded']),
    selectedCategory: state.getIn(['ui', 'feedback', 'category']),
    isSubmitting: state.getIn(['ui', 'feedback', 'isSubmitting']),
    suggestForPurchaseEnabled: library.getIn(['suggestForPurchase', 'premium', 'enabled'])
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(FeedbackActions, dispatch)
});

FeedbackBoxContainer.propTypes = {
  user: ImmutablePropTypes.mapContains({
    id: PropTypes.number.isRequired
  }),
  enabled: PropTypes.bool,
  categories: ImmutablePropTypes.listOf(PropTypes.string),
  contactLinks: ImmutablePropTypes.mapOf(PropTypes.string, PropTypes.string),
  actions: PropTypes.objectOf(PropTypes.func),
  selectedCategory: PropTypes.string,
  isSubmitting: PropTypes.bool,
  expanded: PropTypes.bool,
  suggestForPurchaseEnabled: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackBoxContainer);
