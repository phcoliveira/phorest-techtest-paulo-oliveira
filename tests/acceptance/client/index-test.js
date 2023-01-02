import { currentRouteName, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'phorest-techtest-paulo-oliveira/tests/helpers';
import { ClientIndexPageObject } from 'phorest-techtest-paulo-oliveira/tests/page-objects';
import { module, test } from 'qunit';

const pageObject = new ClientIndexPageObject();

module('Acceptance | client/index', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /client', async function (assert) {
    await visit('/client');

    assert.strictEqual(currentRouteName(), 'client.index');
    assert.dom(pageObject.mainContent.element).isVisible();
  });
});
