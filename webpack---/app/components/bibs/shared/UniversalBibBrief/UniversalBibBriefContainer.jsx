import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { catalogBibShape, bibShape } from '@bibliocommons/bc-prop-types';
import { selectBibEntities, selectCatalogBibEntities } from 'app/selectors/EntitiesSelector';
import UniversalBibBrief from './UniversalBibBrief';

export function UniversalBibBriefContainer(props) {
  return <UniversalBibBrief {...props} />;
}

UniversalBibBriefContainer.propTypes = {
  // ownProps
  metadataId: PropTypes.string.isRequired,
  // Redux props
  bib: bibShape.isRequired,
  catalogBib: catalogBibShape
};

const mapStateToProps = (state, ownProps) => ({
  bib: selectBibEntities(state).get(ownProps.metadataId),
  catalogBib: selectCatalogBibEntities(state).get(ownProps.metadataId)
});

export default connect(mapStateToProps)(UniversalBibBriefContainer);
