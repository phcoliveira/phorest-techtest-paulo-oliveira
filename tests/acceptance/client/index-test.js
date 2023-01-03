import {
  click,
  currentRouteName,
  currentURL,
  fillIn,
  visit,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'phorest-techtest-paulo-oliveira/tests/helpers';
import { ClientIndexPageObject } from 'phorest-techtest-paulo-oliveira/tests/page-objects';
import { module, test } from 'qunit';

const pageObject = new ClientIndexPageObject();

module('Acceptance | client/index', function (hooks) {
  setupApplicationTest(hooks);

  const base = 'http://foo.bar';

  test('it can be visited', async function (assert) {
    await visit('/client');

    assert.strictEqual(currentRouteName(), 'client.index');
  });

  test('clients can be paginated', async function (assert) {
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

  test('clients can be searched by email or phone', async function (assert) {
    const email = 'test@test.com';
    const phone = '353873691589';
    let url;

    await visit('client');

    url = new URL(currentURL(), base);
    assert.notOk(url.searchParams.has('email'));
    assert.notOk(url.searchParams.has('phone'));

    await fillIn(pageObject.mainContent.search.element, email);

    url = new URL(currentURL(), base);
    assert.strictEqual(url.searchParams.get('email'), email);
    assert.notOk(url.searchParams.has('phone'));

    await fillIn(pageObject.mainContent.search.element, phone);

    url = new URL(currentURL(), base);
    assert.notOk(url.searchParams.has('email'));
    assert.strictEqual(url.searchParams.get('phone'), phone);
  });
});
