import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import JacketCover from '@bibliocommons/shared-jacket-cover';
import { jacketShape } from '@bibliocommons/bc-prop-types';
import { selectCurrentView } from 'app/selectors/ListPresentationSelector';

export class JacketCoverContainer extends React.PureComponent {
  render() {
    return this.props.currentView !== 'small' ? <JacketCover {...this.props} /> : null;
  }
}

JacketCoverContainer.propTypes = {
  currentView: PropTypes.string,
  format: PropTypes.string,
  src: PropTypes.oneOfType([PropTypes.string, jacketShape]),
  size: PropTypes.string,
  responsive: PropTypes.bool,
  testId: PropTypes.string
};

const mapStateToProps = state => ({
  currentView: selectCurrentView(state)
});

export default connect(mapStateToProps)(JacketCoverContainer);
