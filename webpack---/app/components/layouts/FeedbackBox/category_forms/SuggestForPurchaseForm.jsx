import React from 'react';
import { FormattedMessage } from 'react-intl';
import { selectCurrentLibrary } from 'app/selectors/LibrarySelector';
import { useSelector } from 'react-redux';

export default function SuggestForPurchaseForm() {
  const currentLibrary = useSelector(selectCurrentLibrary);
  return (
    <a href={`//${currentLibrary.get('domain')}.bibliocommons.com/suggested_purchases`}>
      <FormattedMessage id="feedback_suggest_for_purchase_link" />
    </a>
  );
}
