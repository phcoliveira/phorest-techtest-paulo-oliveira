import { service } from '@ember/service';
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
}
