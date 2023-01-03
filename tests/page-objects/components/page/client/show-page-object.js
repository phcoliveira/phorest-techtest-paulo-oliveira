import { PageObject, selector } from 'fractal-page-object';

function dataTestFor(elementName) {
  return `[data-test-page-client-show="${elementName}"]`;
}

export class PageClientShowPageObject extends PageObject {
  constructor(elementName) {
    super(elementName ?? dataTestFor('root'));
  }

  fullName = selector(dataTestFor('full-name'));
}
