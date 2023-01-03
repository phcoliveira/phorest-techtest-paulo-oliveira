import { setupTest } from 'phorest-techtest-paulo-oliveira/tests/helpers';
import ENV from 'phorest-techtest-paulo-oliveira/config/environment';
import { module, test } from 'qunit';

module('Unit | Service | api/voucher', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const service = this.owner.lookup('service:api/voucher');
    assert.ok(service);
  });

  module('instance.searchVouchers()', function () {
    test('it searches for vouchers', async function (assert) {
      const service = this.owner.lookup('service:api/voucher');
      const response = await service.searchVouchers();

      assert.ok(response.ok);
    });
  });

  module('instance.createVoucher()', function () {
    test('it creates a voucher', async function (assert) {
      const voucher = {
        clientId: 'cGTh2vCF3HePjT4vQPVSSg',
        creatingBranchId: ENV.defaultBranchId,
        expiryDate: new Date('9999/12/31').toISOString(),
        issueDate: new Date().toISOString(),
        originalBalance: 1000,
        remainingBalance: 900,
      };

      const service = this.owner.lookup('service:api/voucher');
      const response = await service.createVoucher(voucher);

      assert.ok(response.ok);
    });
  });
});
