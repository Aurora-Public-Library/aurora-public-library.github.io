import PropTypes from 'prop-types';
import React from 'react';

class CallNumber extends React.PureComponent {
  render() {
    return <span className="cp-call-number">{this.props.callNumber}</span>;
  }
}

CallNumber.propTypes = {
  callNumber: PropTypes.string
};

export default CallNumber;
