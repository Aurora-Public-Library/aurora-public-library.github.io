import React from 'react';
import { getIconForFormat } from '@bibliocommons/utils-format';
import { bibShape } from '@bibliocommons/bc-prop-types';

import FormatInfoContainer from 'app/components/shared/FormatInfo/FormatInfoContainer';

import './ItemFormat.scss';

export default function ItemFormat({ bib }) {
  const format = bib.getIn(['briefInfo', 'format']);

  if (!bib) {
    return null;
  }

  return (
    <div className="cp-item-format">
      <span
        data-test-id={`format-indicator-${format.toLowerCase()}`}
        className={getIconForFormat(format)}
        aria-hidden
      />
      <FormatInfoContainer item={bib} showCallNumber={false} />
    </div>
  );
}

ItemFormat.propTypes = {
  bib: bibShape
};
