import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage, useIntl } from 'react-intl';
import compact from 'lodash/compact';
import ScreenReaderMessage from '@bibliocommons/base-screen-reader-message';
import CallNumber from 'app/components/shared/CallNumber';
import Edition from '@bibliocommons/shared-edition';
import PrimaryLanguage from '@bibliocommons/shared-primary-language';
import PublicationDate from '@bibliocommons/shared-publication-date';

import './FormatInfo.scss';

export default function FormatInfo({ item, className, showEdition, showLanguage, showCallNumber }) {
  const intl = useIntl();
  const format = item.getIn(['briefInfo', 'format']).toLowerCase();
  const publicationDate = item.getIn(['briefInfo', 'publicationDate']);
  const edition = item.getIn(['briefInfo', 'edition']);
  const callNumber = item.getIn(['briefInfo', 'callNumber']);
  const primaryLanguage = item.getIn(['briefInfo', 'primaryLanguage']);

  function renderScreenReaderMessage() {
    return compact([
      publicationDate
        ? `${intl.formatMessage({ id: `FORMAT.${format}` })}, ${publicationDate}`
        : intl.formatMessage({ id: `FORMAT.${format}` }),
      showEdition ? edition : null,
      showLanguage && primaryLanguage
        ? `${intl.formatMessage({ id: 'LANGUAGE.field' })}: ${intl.formatMessage({
            id: `LANGUAGE.${primaryLanguage}`
          })}`
        : null,
      showCallNumber ? `${intl.formatMessage({ id: 'CALL_NUMBER' })}: ${callNumber}` : null
    ]).join('. ');
  }

  return (
    <>
      <span aria-hidden>
        <div className={cn('cp-format-info', className)}>
          <div className="format-info-main-content">
            <span className="cp-format-indicator" data-test-id="format-indicator">
              <FormattedMessage id={`FORMAT.${format}`} />
            </span>
            {publicationDate && <PublicationDate publicationDate={publicationDate} />}
            {showEdition && <Edition edition={edition} />}
            {showLanguage && <PrimaryLanguage primaryLanguage={primaryLanguage} />}
          </div>
          {showCallNumber && <CallNumber callNumber={callNumber} />}
        </div>
      </span>
      <ScreenReaderMessage>{renderScreenReaderMessage()}</ScreenReaderMessage>
    </>
  );
}

FormatInfo.displayName = 'FormatInfo';

FormatInfo.propTypes = {
  item: ImmutablePropTypes.map.isRequired,
  className: PropTypes.string,
  showEdition: PropTypes.bool,
  showLanguage: PropTypes.bool,
  showCallNumber: PropTypes.bool
};

FormatInfo.defaultProps = {
  showLanguage: true
};
