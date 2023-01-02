import { currentRouteName, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'phorest-techtest-paulo-oliveira/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | client/index', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /client', async function (assert) {
    await visit('/client');

    assert.strictEqual(currentRouteName(), 'client.index');
  });
});
