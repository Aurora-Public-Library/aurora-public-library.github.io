import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { catalogBibShape } from '@bibliocommons/bc-prop-types';
import { selectCatalogBibEntities } from 'app/selectors/EntitiesSelector';
import BibBrief from './BibBrief';

export class BibBriefContainer extends React.PureComponent {
  render() {
    return <BibBrief {...this.props} />;
  }
}

BibBriefContainer.propTypes = {
  // ownProps
  metadataId: PropTypes.string.isRequired,
  // Redux props
  catalogBib: catalogBibShape.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  catalogBib: selectCatalogBibEntities(state).get(ownProps.metadataId)
});

export default connect(mapStateToProps)(BibBriefContainer);
