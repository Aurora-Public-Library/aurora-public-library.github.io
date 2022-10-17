import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import TextArea from '@bibliocommons/text-area';
import { PrimarySolidButton } from '@bibliocommons/base-buttons';
import ScreenReaderMessage from '@bibliocommons/base-screen-reader-message';

export default function CommentableForm({ value, handleMessageChange, selectedCategory }) {
  const label = (
    <ScreenReaderMessage>
      <FormattedMessage id="feedback_comment_label" />
    </ScreenReaderMessage>
  );

  return (
    <div>
      <div className="form-group">
        <TextArea
          maxLength={4000}
          required
          value={value}
          id="feedback-message"
          label={label}
          handleChange={handleMessageChange}
          rows="5"
          cols="60"
        />
      </div>

      <div className="text-right form-group">
        <PrimarySolidButton dataKey="feedback-submit-button" type="submit" disabled={selectedCategory === null}>
          <FormattedMessage id="feedback_submit_feedback_btn" />
        </PrimarySolidButton>
      </div>
    </div>
  );
}

CommentableForm.propTypes = {
  selectedCategory: PropTypes.string,
  handleMessageChange: PropTypes.func.isRequired,
  value: PropTypes.string
};

CommentableForm.displayName = 'CommentableForm';
