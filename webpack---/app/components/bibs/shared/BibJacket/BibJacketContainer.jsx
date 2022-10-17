import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { jacketShape } from '@bibliocommons/bc-prop-types';
import { selectCatalogBib } from 'app/selectors/catalogBibs/CatalogBibSelector';
import BibJacket from './BibJacket';

export class BibJacketContainer extends React.PureComponent {
  render() {
    return <BibJacket {...this.props} />;
  }
}

BibJacketContainer.propTypes = {
  renderAsLink: PropTypes.bool,
  reciprocalRank: PropTypes.number,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  format: PropTypes.string,
  cover: jacketShape,
  metadataId: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  catalogBib: ownProps.catalogBib || selectCatalogBib(state)
});

export default connect(mapStateToProps)(BibJacketContainer);
