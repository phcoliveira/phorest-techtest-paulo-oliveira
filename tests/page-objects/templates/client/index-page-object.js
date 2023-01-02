import { PageObject, selector } from 'fractal-page-object';
import { PageClientIndexPageObject } from '../../components';

const mainContentPageObject = new PageClientIndexPageObject();

export class ClientIndexPageObject extends PageObject {
  mainContent = selector(
    mainContentPageObject.selector,
    PageClientIndexPageObject
  );
}
