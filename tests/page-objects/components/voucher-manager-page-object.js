import { PageObject, selector } from 'fractal-page-object';

function dataTestFor(elementName) {
  return `[data-test-voucher-manager="${elementName}"]`;
}

export class VoucherManagerPageObject extends PageObject {
  constructor(elementName) {
    super(elementName ?? dataTestFor('root'));
  }

  newVoucher = selector(dataTestFor('new-voucher'));

  vouchers = selector(dataTestFor('voucher'));

  loading = selector(dataTestFor('loading'));

  noVoucher = selector(dataTestFor('no-voucher'));
}
