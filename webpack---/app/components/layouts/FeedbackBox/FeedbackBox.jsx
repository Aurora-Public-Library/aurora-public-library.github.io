import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FormattedHTMLMessage } from '@bibliocommons/react-intl';

import Heading from '@bibliocommons/heading';
import { PrimarySolidButton, IconButton } from '@bibliocommons/base-buttons';
import { Close } from '@bibliocommons/base-icons';
import ScreenReaderMessage from '@bibliocommons/base-screen-reader-message';
import FeedbackContactLinks from './FeedbackContactLinks';
import FeedbackForm from './FeedbackForm';

import './FeedbackBox.scss';

export class FeedbackBox extends React.PureComponent {
  renderCloseButton(visibleOnMobile) {
    return (
      <IconButton
        dataKey="feedback-close-button"
        className={`feedback-close-button ${visibleOnMobile ? 'visible-xs' : 'hidden-xs'}`}
        aria-label={this.props.intl.formatMessage({ id: 'button_close' })}
        handleClick={this.props.actions.collapseFeedbackBox}
      >
        <Close />
        <ScreenReaderMessage>
          <FormattedMessage id="button_close" />
        </ScreenReaderMessage>
      </IconButton>
    );
  }

  renderCollapsed() {
    return (
      <div className="feedback-teaser container clearfix">
        <div className="feedback-left-content">
          <Heading tagName="h3" size="medium" className="category-name">
            <FormattedMessage id="feedback_heading" />
          </Heading>
          <FormattedMessage tagName="p" id="feedback_prompt" />
        </div>

        <div className="feedback-right-content ">
          <PrimarySolidButton
            className="feedback-expand-btn"
            dataKey="submit-feedback-button"
            handleClick={this.props.actions.expandFeedbackBox}
          >
            <FormattedMessage id="feedback_submit_feedback_btn" />
          </PrimarySolidButton>
        </div>
      </div>
    );
  }

  renderExpanded() {
    return (
      <div className="feedback-expanded container clearfix">
        <div className="feedback-left-content">
          {this.renderCloseButton(true)}
          <Heading tagName="h3" size="medium">
            <FormattedMessage id="feedback_heading" />
          </Heading>
          <FormattedHTMLMessage tagName="p" id="feedback_review_notice" />

          <FeedbackForm
            categories={this.props.categories}
            selectedCategory={this.props.selectedCategory}
            isSubmitting={this.props.isSubmitting}
            actions={this.props.actions}
            suggestForPurchaseEnabled={this.props.suggestForPurchaseEnabled}
          />
        </div>

        <div className="feedback-right-content">
          {this.renderCloseButton(false)}
          <div className="contact-links">
            <FeedbackContactLinks contactLinks={this.props.contactLinks} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="cp-feedback-box">
        <div className="feedback-wrapper">{this.props.expanded ? this.renderExpanded() : this.renderCollapsed()}</div>
      </div>
    );
  }
}

FeedbackBox.propTypes = {
  categories: ImmutablePropTypes.listOf(PropTypes.string),
  contactLinks: ImmutablePropTypes.mapOf(PropTypes.string, PropTypes.string),
  selectedCategory: PropTypes.string,
  isSubmitting: PropTypes.bool,
  expanded: PropTypes.bool,

  actions: PropTypes.objectOf(PropTypes.func),
  suggestForPurchaseEnabled: PropTypes.bool
};

export default injectIntl(FeedbackBox);
