import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';
import { selectAppConfig } from 'app/selectors/AppSelector';
import { selectCurrentLibrary } from 'app/selectors/LibrarySelector';

export default function LegacyLibraryBranding({ fileName }) {
  const appConfig = useSelector(selectAppConfig);
  const currentLibrary = useSelector(selectCurrentLibrary);
  const cdnHost = appConfig.getIn(['coreAssets', 'cdnHost']);
  const cssPath = appConfig.getIn(['coreAssets', 'cssPath']);
  const libraryCssPath = `${cdnHost}${cssPath}/${currentLibrary.get('siteId')}`;
  const href = `${libraryCssPath}/${fileName}?${appConfig.get('coreCssFingerprint')}`;

  return (
    <Helmet>
      <link href={href} media="screen" rel="stylesheet" type="text/css" />
    </Helmet>
  );
}

LegacyLibraryBranding.propTypes = {
  fileName: PropTypes.string.isRequired
};
