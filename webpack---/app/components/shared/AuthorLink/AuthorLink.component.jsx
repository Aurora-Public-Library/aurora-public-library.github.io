import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import { Link } from 'react-router-dom';
import { bindAll } from '@bibliocommons/utils-react';
import { bibEventComposer } from '@bibliocommons/analytics-event-composers';
import { sendAnalyticsEvents } from '@bibliocommons/utils-analytics';
import AnalyticsConstants from '@bibliocommons/constants-analytics';

const { composeAuthorClickEvent } = bibEventComposer;
const { CUSTOM_DIMENSIONS } = AnalyticsConstants;

export default class AuthorLink extends React.PureComponent {
  constructor(props) {
    super(props);
    bindAll(this);
  }

  handleClick() {
    const { reciprocalRank, metadataId } = this.props;
    sendAnalyticsEvents(
      composeAuthorClickEvent({
        containerName: CUSTOM_DIMENSIONS.CONTAINER_NAMES.BIB_ITEM,
        reciprocalRank,
        metadataId
      })
    );
  }

  normalizeAuthors() {
    const { authors } = this.props;
    const normalizedAuthors = Immutable.List.isList(authors) ? authors.toJS() : authors;

    let key = 0;

    const links = normalizedAuthors.map((author, i) => (
      <span key={`${author}-${key++}`}>
        {this.renderAuthorLink(author, i)}
        {i < normalizedAuthors.length - 1 ? ' • ' : ''}
      </span>
    ));

    return links;
  }

  renderAuthorLink(author, index = 0) {
    const { target, renderAsLink, linkTag: LinkTag } = this.props;
    const searchPath = `/v2/search?query=${encodeURIComponent(author)}&searchType=author`;

    const similarProps = {
      target,
      rel: 'noopener noreferrer',
      className: 'author-link'
    };

    if (renderAsLink) {
      if (LinkTag) {
        return (
          <LinkTag {...similarProps} dataKey="author-link" href={searchPath} handleClick={this.handleClick}>
            {author}
          </LinkTag>
        );
      }

      return (
        // eslint-disable-next-line @bibliocommons/bibliocommons/dataKey
        <Link {...similarProps} data-key="author-link" key={index} onClick={this.handleClick} to={searchPath}>
          {author}
        </Link>
      );
    }

    return (
      <div key={index} className="author-link">
        {author}
      </div>
    );
  }

  render() {
    return <span className="cp-author-link">{this.normalizeAuthors()}</span>;
  }
}

AuthorLink.propTypes = {
  authors: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), ImmutablePropTypes.listOf(PropTypes.string)]),
  target: PropTypes.string,
  renderAsLink: PropTypes.bool,
  reciprocalRank: PropTypes.number,
  linkTag: PropTypes.elementType,
  metadataId: PropTypes.string
};

AuthorLink.defaultProps = {
  authors: [],
  target: '_parent',
  renderAsLink: true
};

AuthorLink.displayName = 'AuthorLink';
