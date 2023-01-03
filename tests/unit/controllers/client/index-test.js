import { setupTest } from 'phorest-techtest-paulo-oliveira/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Controller | client/index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const controller = this.owner.lookup('controller:client/index');
    assert.ok(controller);
  });
});
