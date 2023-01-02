import { setupTest } from 'phorest-techtest-paulo-oliveira/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Service | api/client', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const service = this.owner.lookup('service:api/client');
    assert.ok(service);
  });

  module('instance.searchClients()', function () {
    test('it searches for clients', async function (assert) {
      const service = this.owner.lookup('service:api/client');
      const response = await service.searchClients();

      assert.ok(response.ok);
    });
  });
});
