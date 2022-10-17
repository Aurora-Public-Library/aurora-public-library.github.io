import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { mapLocaleForMoment } from '@bibliocommons/utils-localization';
import Context from '@bibliocommons/context';
import { selectFeatureStatuses } from 'app/selectors/FeatureTogglzSelector';
import { selectAppConfig } from 'app/selectors/AppSelector';
import { selectLocalization } from 'app/selectors/LocalizationSelector';
import { ErrorBoundaryContainer } from 'app/components/errors/ErrorBoundary';

function mapStateToProps(state) {
  const appConfig = selectAppConfig(state);
  return {
    localization: selectLocalization(state),
    coreCdnHost: appConfig.getIn(['coreAssets', 'cdnHost']),
    mobileApp: appConfig.get('mobileApp', false),
    baseURL: appConfig.get('baseURL'),
    features: selectFeatureStatuses(state)
  };
}

class ApplicationContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    moment.locale(mapLocaleForMoment(props.localization.currentLanguage));
    this.state = {
      hydrated: false,
      backToLinkEnabled: false
    };
  }

  componentDidMount() {
    this.setState({ hydrated: true });
  }

  render() {
    const { children, localization, messages = {} } = this.props;
    const contextValue = {
      baseURL: this.props.baseURL,
      coreCdnHost: this.props.coreCdnHost,
      mobileApp: this.props.mobileApp,
      features: this.props.features,
      hydrated: this.state.hydrated,
      backToLinkEnabled: this.state.backToLinkEnabled,
      setBackToLinkEnabled: backToLinkEnabled => this.setState({ backToLinkEnabled })
    };

    return (
      <ErrorBoundaryContainer>
        <IntlProvider
          timeZone="UTC"
          messages={{ ...localization.messages, ...messages }}
          locale={localization.currentLanguage}
          defaultLocale={localization.currentLanguage}
        >
          <Context.Provider value={contextValue}>{children}</Context.Provider>
        </IntlProvider>
      </ErrorBoundaryContainer>
    );
  }
}

ApplicationContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  localization: PropTypes.shape({
    messages: PropTypes.objectOf(PropTypes.string),
    currentLanguage: PropTypes.string
  }).isRequired,
  messages: PropTypes.objectOf(PropTypes.string),
  baseURL: PropTypes.string.isRequired,
  coreCdnHost: PropTypes.string.isRequired,
  mobileApp: PropTypes.bool.isRequired,
  features: ImmutablePropTypes.map.isRequired
};

export default connect(mapStateToProps)(ApplicationContainer);
