import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import Immutable from 'immutable';
import cn from 'classnames';
import { catalogBibShape } from '@bibliocommons/bc-prop-types';
import { ExpandableHtml } from '@bibliocommons/expandable';
import { bibEventComposer } from '@bibliocommons/analytics-event-composers';
import { sendAnalyticsEvents } from '@bibliocommons/utils-analytics';
import AnalyticsConstants from '@bibliocommons/constants-analytics';
import AggregateRatingContainer from 'app/components/shared/AggregateRating/AggregateRatingContainer';
import AuthorLink from 'app/components/bibs/shared/AuthorLink';
import { BibJacketContainer } from 'app/components/bibs/shared/BibJacket';
import BibTitle from 'app/components/bibs/shared/BibTitle';

import './BibBrief.scss';

const { composeAuthorClickEvent } = bibEventComposer;
const { CUSTOM_DIMENSIONS } = AnalyticsConstants;

const handleClick = () => {
  sendAnalyticsEvents(
    composeAuthorClickEvent({
      containerName: CUSTOM_DIMENSIONS.CONTAINER_NAMES.BIB_ITEM
    })
  );
};

export class BibBrief extends React.PureComponent {
  renderJacketCover() {
    const { catalogBib, showJacketAsLink } = this.props;
    const format = catalogBib.getIn(['brief', 'format']);
    const cover = catalogBib.getIn(['brief', 'coverImage']);
    const metadataId = catalogBib.get('metadataId');

    return <BibJacketContainer format={format} cover={cover} metadataId={metadataId} renderAsLink={showJacketAsLink} />;
  }

  renderTitle() {
    return (
      <div>
        <BibTitle catalogBib={this.props.catalogBib} mainTagName="h3" renderAsLink={this.props.showTitleAsLink} />{' '}
      </div>
    );
  }

  renderAuthor() {
    const authors = this.props.catalogBib.getIn(['brief', 'creators'], Immutable.List());
    return <AuthorLink authors={authors} renderAsLink={this.props.showAuthorAsLink} handleClick={handleClick} />;
  }

  renderAdditionalInfo() {
    if (!this.props.showAdditionalInfo) return null;
    const publicationDate = this.props.catalogBib.getIn(['brief', 'publicationDate']);
    const format = this.props.catalogBib.getIn(['brief', 'format']);
    if (!publicationDate) {
      return (
        <span className="bib-brief__additional-info">
          <FormattedMessage id={`FORMAT.${format.toLowerCase()}`} />
        </span>
      );
    }
    return (
      <span className="bib-brief__additional-info">
        {`${this.props.intl.formatMessage({ id: `FORMAT.${format.toLowerCase()}` })}, ${publicationDate}`}
      </span>
    );
  }

  renderRating() {
    if (!this.props.showRating) return null;
    const metadataId = this.props.catalogBib.get('metadataId');
    return <AggregateRatingContainer metadataId={metadataId} />;
  }

  renderDescription() {
    if (!this.props.showDescription) return null;
    const htmlText = this.props.catalogBib.getIn(['brief', 'description'], '');
    const metadataId = this.props.catalogBib.get('metadataId');
    if (htmlText) {
      return (
        <ExpandableHtml
          truncateCount={240}
          htmlText={htmlText}
          expandLinkHref={`#read-more-bib-${metadataId}`}
          textKey="description"
        />
      );
    }
    return null;
  }

  render() {
    if (!this.props.catalogBib) return null;
    const { size } = this.props;
    const classNames = cn('cp-bib-brief', {
      [`bib-brief--${size}`]: size
    });

    return (
      <div className={classNames}>
        {this.renderJacketCover()}
        <div className="bib-brief__main-info">
          {this.renderTitle()}
          {this.renderAuthor()}
          {this.renderAdditionalInfo()}
          {this.renderRating()}
          {this.renderDescription()}
        </div>
      </div>
    );
  }
}

BibBrief.propTypes = {
  catalogBib: catalogBibShape.isRequired,
  showAuthorAsLink: PropTypes.bool,
  showTitleAsLink: PropTypes.bool,
  showJacketAsLink: PropTypes.bool,
  showDescription: PropTypes.bool,
  showRating: PropTypes.bool,
  showAdditionalInfo: PropTypes.bool,
  size: PropTypes.oneOf(['large', 'small'])
};

BibBrief.defaultProps = {
  showAdditionalInfo: true,
  showAuthorAsLink: false,
  showDescription: false,
  showRating: false,
  size: 'small'
};

export default injectIntl(BibBrief);
