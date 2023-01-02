import { setupTest } from 'phorest-techtest-paulo-oliveira/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Route | client/index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:client/index');
    assert.ok(route);
  });
});
