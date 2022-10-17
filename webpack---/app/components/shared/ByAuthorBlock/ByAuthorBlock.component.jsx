import PropTypes from 'prop-types';
import React from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage } from 'react-intl';
import AuthorLink from 'app/components/shared/AuthorLink';

function ByAuthorBlock({
  authors = Immutable.List(),
  target = '_parent',
  renderAsLink = true,
  reciprocalRank,
  metadataId,
  ...props
}) {
  if (authors.length || authors.count()) {
    return (
      <span className="cp-by-author-block" {...props}>
        <FormattedMessage
          id="by_authors"
          values={{
            authorLinks: (
              <AuthorLink
                authors={authors}
                target={target}
                renderAsLink={renderAsLink}
                reciprocalRank={reciprocalRank}
                metadataId={metadataId}
              />
            )
          }}
        />
      </span>
    );
  }

  return null;
}

ByAuthorBlock.propTypes = {
  authors: ImmutablePropTypes.listOf(PropTypes.string),
  target: PropTypes.string,
  renderAsLink: PropTypes.bool,
  reciprocalRank: PropTypes.number,
  metadataId: PropTypes.string
};

ByAuthorBlock.displayName = 'ByAuthorBlock';

export default ByAuthorBlock;
