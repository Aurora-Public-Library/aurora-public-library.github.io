import PropTypes from 'prop-types';
import React from 'react';
import Immutable from 'immutable';
import { injectIntl } from 'react-intl';
import ByAuthorBlock from 'app/components/shared/ByAuthorBlock';
import BibTitle from '@bibliocommons/shared-bib-title';
import { bindAll } from '@bibliocommons/utils-react';
import { bibBriefShape, truncateOptionsShape } from '@bibliocommons/bc-prop-types';

import './BibBrief.scss';

export class BibBrief extends React.PureComponent {
  constructor(props) {
    super(props);
    bindAll(this);
  }

  getBib() {
    return this.props.bib
      ? this.props.bib
      : Immutable.fromJS({
          title: this.props.fallbackTitle || this.props.intl.formatMessage({ id: 'undetermined_item' }),
          id: ''
        });
  }

  getAuthors() {
    const { renderMultiscriptOnly } = this.props;
    const bib = this.getBib();
    let authors = bib.get('authors', Immutable.List());

    if (bib.get('multiscriptAuthor')) {
      if (renderMultiscriptOnly) {
        authors = Immutable.List([bib.get('multiscriptAuthor')]);
      } else {
        authors = authors.unshift(bib.get('multiscriptAuthor'));
      }
    }

    return authors;
  }

  focusOnTitle() {
    if (this._bibTitle) {
      this._bibTitle.focusOnTitle();
    }
  }

  render() {
    const {
      titleTag,
      children,
      anchorTarget,
      renderTitleAsLink,
      renderAuthorsAsLink,
      renderTitleIcon,
      renderScreenReaderTitle,
      truncateTitleOptions,
      renderMultiscriptOnly
    } = this.props;
    const bib = this.getBib();

    return (
      <div className="cp-deprecated-bib-brief">
        <BibTitle
          bib={bib}
          ref={el => (this._bibTitle = el)}
          titleTag={titleTag}
          target={anchorTarget}
          renderAsLink={renderTitleAsLink}
          renderIcon={renderTitleIcon}
          renderScreenReaderMessage={renderScreenReaderTitle}
          truncateOptions={truncateTitleOptions}
          reciprocalRank={this.props.reciprocalRank}
          renderMultiscriptOnly={renderMultiscriptOnly}
        />
        <ByAuthorBlock
          authors={this.getAuthors()}
          target={anchorTarget}
          renderAsLink={renderAuthorsAsLink}
          reciprocalRank={this.props.reciprocalRank}
          metadataId={bib.get('metadataId')}
        />
        {children}
      </div>
    );
  }
}

BibBrief.displayName = 'BibBrief';

const injectIntlPropTypes = {};

BibBrief.defaultProps = {
  children: null,
  anchorTarget: '_parent',
  renderTitleAsLink: true,
  renderAuthorsAsLink: true
};

BibBrief.propTypes = {
  bib: bibBriefShape,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  renderTitleIcon: PropTypes.func,
  renderScreenReaderTitle: PropTypes.func,
  titleTag: PropTypes.string,
  anchorTarget: PropTypes.string,
  renderTitleAsLink: PropTypes.bool,
  renderAuthorsAsLink: PropTypes.bool,
  reciprocalRank: PropTypes.number,
  truncateTitleOptions: truncateOptionsShape,
  fallbackTitle: PropTypes.string,
  ...injectIntlPropTypes
};

export default injectIntl(BibBrief, { forwardRef: true });
