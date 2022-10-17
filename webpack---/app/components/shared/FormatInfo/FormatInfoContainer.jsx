import injectLibrary from 'app/components/hocs/injectLibrary';
import { MATERIAL_TYPE_PHYSICAL } from 'app/constants/BibConstants';
import UnwrappedFormatInfo from './component/FormatInfo.component';

const mapLibraryToProps = ({ library }, ownProps) => ({
  showEdition:
    !library.get('onlyShowEditionsForCDROMAndVideoGames') ||
    ['CDROM', 'VIDEO_GAME'].includes(ownProps.item.getIn(['briefInfo', 'format'])),
  showCallNumber:
    typeof ownProps.showCallNumber !== 'undefined'
      ? ownProps.showCallNumber
      : library.get('showCallNumber') &&
        (library.get('showCallNumberForDigital') ||
          ownProps.item.getIn(['policy', 'materialType']) === MATERIAL_TYPE_PHYSICAL) &&
        (!library.get('hideCallNumberForHigherSearchScope') || ownProps.searchScopeIsCurrent)
});

export default injectLibrary(mapLibraryToProps)(UnwrappedFormatInfo);
