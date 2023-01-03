import {
  click,
  currentRouteName,
  currentURL,
  visit,
} from '@ember/test-helpers';
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

  test('clients can be paginated', async function (assert) {
    const base = 'http://foo.bar';
    let url;

    await visit('client');

    url = new URL(currentURL(), base);
    assert.notOk(url.searchParams.has('page'));

    await click(pageObject.mainContent.goForward.element);

    url = new URL(currentURL(), base);
    assert.strictEqual(url.searchParams.get('page'), '1');

    await click(pageObject.mainContent.goBack.element);

    url = new URL(currentURL(), base);
    assert.notOk(url.searchParams.has('page'));
  });
});
