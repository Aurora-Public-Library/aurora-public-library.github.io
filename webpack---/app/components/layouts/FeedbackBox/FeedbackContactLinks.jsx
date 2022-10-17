import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage } from 'react-intl';
import Heading from '@bibliocommons/heading';

export default function FeedbackContactLinks({ contactLinks }) {
  if (contactLinks.isEmpty()) {
    return null;
  }

  return (
    <div className="cp-feedback-contact-links">
      <Heading tagName="h3" size="medium">
        <FormattedMessage id="feedback_contact_lib_heading" />
      </Heading>
      {contactLinks.entrySeq().map(([localeKey, url]) => (
        <p key={localeKey}>
          <a href={url}>
            <FormattedMessage id={localeKey} />
          </a>
        </p>
      ))}
    </div>
  );
}

FeedbackContactLinks.propTypes = {
  contactLinks: ImmutablePropTypes.mapOf(PropTypes.string, PropTypes.string)
};

FeedbackContactLinks.displayName = 'FeedbackContactLinks';
