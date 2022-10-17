import PropTypes from 'prop-types';
import React from 'react';
import { jacketShape } from '@bibliocommons/bc-prop-types';
import { Link } from '@bibliocommons/base-links';
import JacketCover from '@bibliocommons/shared-jacket-cover';
import { bindAll } from '@bibliocommons/utils-react';
import FormatIcon from '@bibliocommons/format-icon';
import { sendAnalyticsEvents } from '@bibliocommons/utils-analytics';
import { bibEventComposer } from '@bibliocommons/analytics-event-composers';
import AnalyticsConstants from '@bibliocommons/constants-analytics';

import './BibJacket.scss';

const { composeImageClickEvent } = bibEventComposer;
const { CUSTOM_DIMENSIONS } = AnalyticsConstants;

export class BibJacket extends React.PureComponent {
  constructor(props) {
    super(props);
    bindAll(this);
  }

  handleClick() {
    const { reciprocalRank, metadataId } = this.props;
    sendAnalyticsEvents(
      composeImageClickEvent({
        containerName: CUSTOM_DIMENSIONS.CONTAINER_NAMES.BIB_ITEM,
        reciprocalRank,
        metadataId
      })
    );
  }

  renderPlaceholder() {
    const { format, title } = this.props;
    const placeholder = this.props.placeholder || (format ? <FormatIcon format={format} /> : title?.charAt(0));

    return (
      <div className="placeholder-wrapper">
        <div className="placeholder">{placeholder}</div>
      </div>
    );
  }

  renderJacketCover() {
    const { format, cover } = this.props;

    return (
      <JacketCover
        size="large"
        format={format}
        renderDefault={this.renderPlaceholder}
        src={cover}
        loadingMode="eager"
      />
    );
  }

  render() {
    const { renderAsLink, metadataId } = this.props;

    return renderAsLink ? (
      <Link
        className="cp-bib-jacket"
        dataKey="bib-jacket-link"
        aria-hidden
        tabIndex="-1"
        href={`/v2/record/${metadataId}`}
        rel="noopener noreferrer"
        handleClick={this.handleClick}
      >
        {this.renderJacketCover()}
      </Link>
    ) : (
      <div className="cp-bib-jacket" aria-hidden="true">
        {this.renderJacketCover()}
      </div>
    );
  }
}

BibJacket.propTypes = {
  renderAsLink: PropTypes.bool,
  reciprocalRank: PropTypes.number,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  format: PropTypes.string,
  cover: jacketShape,
  metadataId: PropTypes.string.isRequired
};

export default BibJacket;
