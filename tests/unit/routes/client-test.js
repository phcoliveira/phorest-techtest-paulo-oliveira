import { setupTest } from 'phorest-techtest-paulo-oliveira/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Route | client', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:client');
    assert.ok(route);
  });
});
