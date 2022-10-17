import React from 'react';
import { catalogBibShape, bibShape } from '@bibliocommons/bc-prop-types';
import JacketCoverContainer from 'app/components/shared/JacketCover/JacketCoverContainer';
import ItemFormat from 'app/components/shared/ItemFormat';
import DeprecatedBibBrief from 'app/components/shared/BibBrief';
import { BibBrief as EnhancedBibBrief } from '../BibBrief';

import './UniversalBibBrief.scss';

export default function UniversalBibBrief({ bib, catalogBib }) {
  return catalogBib ? (
    <EnhancedBibBrief catalogBib={catalogBib} />
  ) : (
    <div className="cp-universal-bib-brief">
      <JacketCoverContainer
        src={bib.getIn(['briefInfo', 'jacket'])}
        format={bib.getIn(['briefInfo', 'format'])}
        alt=""
      />
      <DeprecatedBibBrief
        bib={bib.getIn(['briefInfo'])}
        renderTitleAsLink={false}
        renderAuthorsAsLink={false}
        titleTag="h3"
      >
        <ItemFormat bib={bib} />
      </DeprecatedBibBrief>
    </div>
  );
}

UniversalBibBrief.propTypes = {
  catalogBib: catalogBibShape,
  bib: bibShape.isRequired
};
