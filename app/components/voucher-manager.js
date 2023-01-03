import { action } from '@ember/object';
import { service } from '@ember/service';
import ENV from 'phorest-techtest-paulo-oliveira/config/environment';
import Component from '@glimmer/component';
import { task } from 'ember-concurrency';

export default class VoucherManagerComponent extends Component {
  /**
   * args:
   * - client: Client
   */

  @service('api/voucher')
  apiVoucherService;

  getVouchers = task(async () => {
    const { clientId } = this.args.client;
    const response = await this.apiVoucherService.searchVouchers({ clientId });
    const payload = await response.json();

    return payload._embedded?.vouchers ?? [];
  });

  _createVoucher = task(async (originalBalance) => {
    const { clientId } = this.args.client;
    const voucher = {
      clientId,
      creatingBranchId: ENV.defaultBranchId,
      expiryDate: new Date('9999/12/31').toISOString(),
      issueDate: new Date().toISOString(),
      originalBalance,
      remainingBalance: originalBalance,
    };

    await this.apiVoucherService.createVoucher(voucher);
    await this.getVouchers.perform();
  });

  @action
  createVoucher(event) {
    this._createVoucher.perform(parseFloat(event.target.value));
  }
}
