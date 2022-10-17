import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { PortalContext } from '@bibliocommons/base-portal';
import { childrenShape } from '@bibliocommons/bc-prop-types';
import { GlobalMessagingContainer } from 'app/components/GlobalMessaging';
import { LoginModalContainer } from 'app/components/login/LoginModal';
import BrandingVariables from 'app/components/layouts/BrandingVariables';
import LegacyLibraryBranding from 'app/components/layouts/LegacyLibraryBranding';
import PrivacySettingsModalContainer from 'app/components/bibs/shared/ugc/PrivacySettingsModal';

import './DefaultStyles.scss';
import './LegacyStyles.scss';

export default class ComponentWrapper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.globalComponents = null;
  }

  renderGlobalComponents() {
    // The ComponentWrapper may be rendered multiple times,
    // so add logic to ensure that global components are rendered once.
    if (!ComponentWrapper.hasRenderedGlobalComponents) {
      ComponentWrapper.hasRenderedGlobalComponents = true;

      if (!this.globalComponents) {
        this.globalComponents = (
          <div>
            <BrandingVariables scope=".bibliocommons-sdk" />
            <LegacyLibraryBranding fileName="nerf_sdk_library_branding.css" />
            <GlobalMessagingContainer />
            <LoginModalContainer />
            <PrivacySettingsModalContainer />
          </div>
        );
      }
    }

    return this.globalComponents;
  }

  render() {
    const namespace = cn('bibliocommons-sdk', this.props.legacy ? 'sdk-legacy-styles' : 'sdk-default-styles');

    return (
      <PortalContext.Provider value={{ namespace }}>
        <div className={namespace}>
          {this.props.children}
          {this.renderGlobalComponents()}
        </div>
      </PortalContext.Provider>
    );
  }
}

ComponentWrapper.propTypes = {
  children: childrenShape.isRequired,
  legacy: PropTypes.bool.isRequired
};
