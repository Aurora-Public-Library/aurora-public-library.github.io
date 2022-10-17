import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';
import { selectBranding } from 'app/selectors/BrandingSelector';

/*
 * NOTE: Core only allows the primary brand colour at this time.
 */
export default function BrandingVariables({ scope = ':root' }) {
  const branding = useSelector(selectBranding);

  return (
    <Helmet>
      <style type="text/css">
        {`${scope} {
          --primary-brand-color: ${branding.get('primaryBrandColor', 'initial')};
          --primary-brand-color-variant: ${branding.get('primaryBrandColorVariant', 'initial')};
          --secondary-brand-color: initial;
          --secondary-brand-color-variant: initial;
          --link-color-default: initial;
          --link-color-default-variant: initial;
          --font-color-base: initial;
          --font-color-base-variant: initial;
          --font-color-headings: initial;
          --font-color-headings-variant: initial;
          --link-color-secondary: initial;
          --link-color-secondary-variant: initial;
          --font-family-base: initial;
          --font-family-variant: initial;
          --font-family-monospace: initial;
          --font-family-headings: initial;
          --font-family-headings-variant: initial;
          --font-weight-base: initial;
          --font-weight-headings: initial;
          --font-weight-headings-variant: initial;
        }`}
      </style>
    </Helmet>
  );
}

BrandingVariables.propTypes = {
  scope: PropTypes.string
};
