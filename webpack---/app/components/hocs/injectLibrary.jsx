import React from 'react';
import { connect } from 'react-redux';
import { selectCurrentLibrary, selectCurrentSite } from '../../selectors/LibrarySelector';

// By default, we pass the whole library as a prop
const defaultMapLibraryToProps = (library, site) => ({
  library,
  site
});

/**
 * Usage:
 *        injectLibrary()(ComposedComponent)
 *          passes "library" as a prop to the ComposedComponent
 *
 *        injectLibrary((library) => ({ name: library.get('name')}))(ComposedComponent)
 *          passes "name" as a prop to ComposedComponent.
 *          "name" will be the value of library.get('name')
 */
const injectLibrary = (mapLibraryToProps = defaultMapLibraryToProps) => ComposedComponent => {
  function LibraryWrapper(props) {
    return <ComposedComponent {...props} />;
  }

  LibraryWrapper.displayName = `LibraryWrapper(${ComposedComponent.displayName})`;

  return connect((state, ownProps) =>
    mapLibraryToProps(
      {
        library: selectCurrentLibrary(state),
        site: selectCurrentSite(state)
      },
      ownProps
    )
  )(LibraryWrapper);
};

export default injectLibrary;
