import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import { catalogBibShape } from '@bibliocommons/bc-prop-types';
import { Link } from '@bibliocommons/base-links';
import Heading from '@bibliocommons/heading';
import ScreenReaderMessage from '@bibliocommons/base-screen-reader-message';
import { threeLetterToTwoLetterLangCodes } from '@bibliocommons/constants-languages';
import { truncate } from '@bibliocommons/utils-string';
import { sendAnalyticsEvents } from '@bibliocommons/utils-analytics';
import { bibEventComposer } from '@bibliocommons/analytics-event-composers';
import AnalyticsConstants from '@bibliocommons/constants-analytics';

import './BibTitle.scss';

const { composeTitleClickEvent } = bibEventComposer;
const { CUSTOM_DIMENSIONS } = AnalyticsConstants;

export class BibTitle extends React.PureComponent {
  handleClick = () => {
    const { reciprocalRank, catalogBib } = this.props;
    sendAnalyticsEvents(
      composeTitleClickEvent({
        containerName: CUSTOM_DIMENSIONS.CONTAINER_NAMES.BIB_ITEM,
        reciprocalRank,
        metadataId: catalogBib.get('metadataId')
      })
    );
  };

  renderContent({ title, subtitle, titleTag, className, renderAsLink }) {
    const { catalogBib, truncateCount, showSubTitle } = this.props;
    const truncatedTitle = truncateCount && title ? truncate(title, { desiredLength: truncateCount }) : title;
    const lang = threeLetterToTwoLetterLangCodes[catalogBib.getIn(['brief', 'primaryLanguage'])] || 'en';
    const classNames = cn('title', className);
    const titleContent = (
      <>
        <span aria-hidden>{truncatedTitle}</span>
        <ScreenReaderMessage>{title}</ScreenReaderMessage>
      </>
    );
    const subtitleContent = showSubTitle && !!subtitle ? <div className="sub-title">{subtitle}</div> : null;

    if (renderAsLink) {
      return (
        <div className="title-wrapper">
          <Heading tagName={titleTag} className={classNames}>
            <Link
              lang={lang}
              href={`/v2/record/${catalogBib.get('metadataId')}`}
              dataKey="bib-title-link"
              handleClick={this.handleClick}
            >
              {titleContent}
            </Link>
          </Heading>
          {subtitleContent}
        </div>
      );
    }

    return (
      <div className="title-wrapper">
        <Heading tagName={titleTag} className={classNames} lang={lang}>
          {titleContent}
        </Heading>
        {subtitleContent}
      </div>
    );
  }

  render() {
    const { catalogBib, mainTagName, mainClassName, secondaryClassName, renderAsLink } = this.props;
    const catalogBibBrief = catalogBib.get('brief');
    const otherScriptTitle = catalogBibBrief.get('otherScriptTitle');

    return (
      <div className="cp-bib-title">
        {!!otherScriptTitle &&
          this.renderContent({
            title: otherScriptTitle,
            subtitle: catalogBibBrief.get('otherScriptSubTitle'),
            titleTag: mainTagName,
            className: mainClassName,
            renderAsLink
          })}
        {this.renderContent({
          title: catalogBibBrief.get('title'),
          subtitle: catalogBibBrief.get('subTitle'),
          titleTag: otherScriptTitle ? 'div' : mainTagName,
          className: otherScriptTitle ? secondaryClassName : mainClassName,
          renderAsLink: otherScriptTitle ? false : renderAsLink
        })}
      </div>
    );
  }
}

BibTitle.propTypes = {
  catalogBib: catalogBibShape.isRequired,
  renderAsLink: PropTypes.bool,
  truncateCount: PropTypes.number,
  mainTagName: PropTypes.string,
  reciprocalRank: PropTypes.number,
  showSubTitle: PropTypes.bool,
  mainClassName: PropTypes.string,
  secondaryClassName: PropTypes.string
};

BibTitle.defaultProps = {
  showSubTitle: true,
  mainTagName: 'h1'
};

export default BibTitle;
