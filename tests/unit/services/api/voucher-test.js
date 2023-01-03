import { setupTest } from 'phorest-techtest-paulo-oliveira/tests/helpers';
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
});
