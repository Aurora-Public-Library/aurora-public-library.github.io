import '@bibliocommons/polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import httpClient from 'superagent';
import Immutable from 'immutable';
import { MemoryRouter } from 'react-router-dom';

import createReduxStore from 'app/helpers/redux/createReduxStore';
import ErrorService from 'app/services/ErrorService';
import ApiClient from 'app/api/ApiClient';
import ApplicationContainer from '../ApplicationContainer';
import ComponentWrapper from './ComponentWrapper';
import * as legacyComponents from './legacyComponents';
import * as components from './components';

const { BiblioCommonsSDK } = window;

/*
 * Exports
 */
BiblioCommonsSDK.React = React;
BiblioCommonsSDK.ReactDOM = ReactDOM;
BiblioCommonsSDK.PropTypes = PropTypes;
BiblioCommonsSDK.Immutable = Immutable;
BiblioCommonsSDK.legacyComponents = legacyComponents;
BiblioCommonsSDK.components = components;

// Initialize
const initialState = BiblioCommonsSDK.__initialState__;
delete BiblioCommonsSDK.__initialState__;

const { apiGatewayURL, libraryDomain, airbrakeConfig, enableWebpackHMR, enableReduxDevTools } = initialState.app;

ErrorService.initialize(airbrakeConfig);

const currentLanguage = initialState.localization.currentLanguage;
const apiClient = new ApiClient(httpClient, {
  locale: currentLanguage,
  subdomain: libraryDomain,
  apiGatewayURL
});

const reduxStore = createReduxStore(Immutable.fromJS(initialState), apiClient, enableWebpackHMR, enableReduxDevTools);

/* PUBLIC FUNCTIONS */

/*
 * Executes the given callback when the sdk is fully loaded.
 * @param {Function} callback
 */
BiblioCommonsSDK.init = function init(callback) {
  callback();
};

/*
 * Renders the given component with the given name if supported.
 * @param {string}  componentName
 * @param {string|Element}  container
 * @param {object}  props
 * @param {function} callback
 */
BiblioCommonsSDK.renderComponent = async function renderComponent(componentName, container, props = {}, callback) {
  const Component = components[componentName] || legacyComponents[componentName];
  const target = typeof container === 'string' ? document.querySelector(container) : container;
  const isLegacyComponent = !!legacyComponents[componentName];

  if (!Component) {
    throw new Error(`Component ${componentName} was not found`);
  }

  if (!target) {
    throw new Error('Target container does not exist');
  }

  if (Component.load) {
    await Component.load();
  }

  ReactDOM.render(
    <Provider store={reduxStore}>
      <ApplicationContainer messages={props.messages}>
        <MemoryRouter>
          <ComponentWrapper legacy={isLegacyComponent}>
            <Component {...props} />
          </ComponentWrapper>
        </MemoryRouter>
      </ApplicationContainer>
    </Provider>,
    target,
    callback
  );
};

BiblioCommonsSDK.renderWidget = BiblioCommonsSDK.renderComponent; // Backwards compatibility

// Flush the callQueue
BiblioCommonsSDK.__callQueue__.forEach(([method, args]) => BiblioCommonsSDK[method](...args));
delete BiblioCommonsSDK.__callQueue__;

export default BiblioCommonsSDK;
