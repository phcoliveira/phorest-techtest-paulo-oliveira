import { PageObject, selector } from 'fractal-page-object';

function dataTestFor(elementName) {
  return `[data-test-page-client-index="${elementName}"]`;
}

export class PageClientIndexPageObject extends PageObject {
  constructor(elementName) {
    super(elementName ?? dataTestFor('root'));
  }

  clients = selector(dataTestFor('client'));

  noClient = selector(dataTestFor('no-client'));

  pagination = selector(dataTestFor('pagination'));

  goBack = selector(dataTestFor('go-back'));

  currentPage = selector(dataTestFor('current-page'));

  goForward = selector(dataTestFor('go-forward'));
}
