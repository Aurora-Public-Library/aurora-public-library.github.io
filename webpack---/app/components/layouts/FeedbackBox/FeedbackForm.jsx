import PropTypes from 'prop-types';
import React from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage, injectIntl } from 'react-intl';

import { bindAll } from '@bibliocommons/utils-react';
import { Dropdown } from '@bibliocommons/base-dropdown';
import ScreenReaderMessage from '@bibliocommons/base-screen-reader-message';
import CommentableForm from './category_forms/CommentableForm';
import SuggestForPurchaseForm from './category_forms/SuggestForPurchaseForm';

const propTypes = {
  categories: ImmutablePropTypes.listOf(PropTypes.string),
  selectedCategory: PropTypes.string,

  suggestForPurchaseEnabled: PropTypes.bool,
  actions: PropTypes.objectOf(PropTypes.func).isRequired
};

export class FeedbackForm extends React.PureComponent {
  constructor(props) {
    super(props);
    bindAll(this);
    this.state = {
      messageText: ''
    };
  }

  static getBrowserInformation() {
    return {
      screenResolution: `${window.screen.width} x ${window.screen.height}`,
      viewportSize: `${window.outerWidth} x ${window.outerHeight}`,
      referer: window.location.href,
      userAgent: window.navigator.userAgent
    };
  }

  getCategoryOptions() {
    return this.props.categories
      .valueSeq()
      .map(category =>
        Immutable.Map({
          label: this.props.intl.formatMessage({ id: `feedback_cat_${category}` }),
          value: category
        })
      )
      .toList();
  }

  getSelectedCategoryLabel() {
    const localizationKey = this.props.selectedCategory || 'default';
    return this.props.intl.formatMessage({
      id: `feedback_cat_${localizationKey}`
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.submitFeedback({
      comment: this.state.messageText,
      ...FeedbackForm.getBrowserInformation(),
      category: this.props.selectedCategory,
      optIn: false
    });
  }

  handleMessageChange(messageText) {
    this.setState({ messageText });
  }

  renderFormFields() {
    switch (this.props.selectedCategory) {
      case null:
        return null;
      case 'suggest_for_purchase': {
        if (this.props.suggestForPurchaseEnabled) {
          return <SuggestForPurchaseForm />;
        }
        return (
          <CommentableForm
            value={this.state.messageText}
            selectedCategory={this.props.selectedCategory}
            handleMessageChange={this.handleMessageChange}
          />
        );
      }
      default:
        return <CommentableForm value={this.state.messageText} handleMessageChange={this.handleMessageChange} />;
    }
  }

  render() {
    return (
      <form className="cp-feedback-form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <ScreenReaderMessage id="feedback-category-label">
            <FormattedMessage id="feedback_category_label" />
          </ScreenReaderMessage>
          <Dropdown
            dropup
            dataKey="feedback-form-dropdown"
            handleSelect={this.props.actions.updateCategory}
            labelledById="feedback-category-label"
            options={this.getCategoryOptions()}
            renderLabel={this.getSelectedCategoryLabel}
          />
        </div>
        {this.renderFormFields()}
      </form>
    );
  }
}

FeedbackForm.propTypes = propTypes;

export default injectIntl(FeedbackForm);
