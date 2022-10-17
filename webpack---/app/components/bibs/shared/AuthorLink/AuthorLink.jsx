import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from '@bibliocommons/base-links';
import { bindAll } from '@bibliocommons/utils-react';
import ScreenReaderMessage from '@bibliocommons/base-screen-reader-message';
import { truncate } from '@bibliocommons/utils-string';

export default class AuthorLink extends React.PureComponent {
  constructor(props) {
    super(props);
    bindAll(this);
  }

  constructLink(authorName, searchPath) {
    const { linkTag: LinkTag, renderAsLink, truncateCount, handleClick } = this.props;
    const truncatedAuthorName =
      truncateCount && authorName ? truncate(authorName, { desiredLength: truncateCount }) : authorName;

    if (!truncatedAuthorName) return null;

    const content = (
      <span>
        <span aria-hidden>{truncatedAuthorName}</span>
        <ScreenReaderMessage>{authorName}</ScreenReaderMessage>
      </span>
    );

    if (!renderAsLink) {
      return content;
    }

    return (
      <LinkTag
        dataKey="author-link"
        handleClick={handleClick}
        href={searchPath}
        target={this.props.target}
        rel="noopener noreferrer"
      >
        {content}
      </LinkTag>
    );
  }

  renderAuthorLinks(author) {
    const searchType = author.get('searchType') || 'author';

    const authorName = author.get('fullName') || author.get('name');
    const searchQuery = author.get('searchQuery') || authorName;
    const searchPath = `/v2/search?query=${encodeURIComponent(searchQuery)}&searchType=${searchType}`;

    const otherScriptAuthorName = author.get('otherScriptFullName');
    const otherScriptSearchQuery = author.get('otherScriptSearchQuery') || author.get('otherScriptFullName');
    const otherScriptSearchPath = `/v2/search?query=${otherScriptSearchQuery}&searchType=${searchType}`;

    return (
      <span>
        {this.constructLink(otherScriptAuthorName, otherScriptSearchPath)}
        {authorName && otherScriptAuthorName && ' • '}
        {this.constructLink(authorName, searchPath)}
      </span>
    );
  }

  renderAuthors() {
    const { authors } = this.props;

    return authors.map((author, i) => {
      return (
        <span key={author.get('id')}>
          {this.renderAuthorLinks(author)}
          {i < authors.size - 1 && ' • '}
        </span>
      );
    });
  }

  render() {
    return <div className="cp-author-link">{this.renderAuthors()}</div>;
  }
}

AuthorLink.propTypes = {
  authors: ImmutablePropTypes.listOf(ImmutablePropTypes.map).isRequired,
  target: PropTypes.string,
  linkTag: PropTypes.elementType,
  renderAsLink: PropTypes.bool,
  truncateCount: PropTypes.number,
  handleClick: PropTypes.func.isRequired
};

AuthorLink.defaultProps = {
  target: '_parent',
  linkTag: Link,
  renderAsLink: true
};
