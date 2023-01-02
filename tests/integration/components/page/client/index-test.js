import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'phorest-techtest-paulo-oliveira/tests/helpers';
import { PageClientIndexPageObject } from 'phorest-techtest-paulo-oliveira/tests/page-objects';
import { module, test } from 'qunit';

const pageObject = new PageClientIndexPageObject();

module('Integration | Component | page/client/index', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.args = {
      clients: [{ clientId: '1' }, { clientId: '2' }],
    };
  });

  test('it does not accept splat attributes', async function (assert) {
    await render(hbs`
      <Page::Client::Index @clients={{this.args.clients}} data-splat />
    `);

    assert.dom(pageObject.element).doesNotHaveAttribute('data-splat');
  });

  test('it does not yield to dynamic content', async function (assert) {
    await render(hbs`
      <Page::Client::Index @clients={{this.args.clients}}>
        <div id="dynamic-content"></div>
      </Page::Client::Index>
    `);

    assert.dom('#dynamic-content').doesNotExist();
  });

  test('it shows all clients', async function (assert) {
    await render(hbs`
      <Page::Client::Index @clients={{this.args.clients}} />
    `);

    assert.strictEqual(pageObject.clients.length, this.args.clients.length);

    for (const [index, client] of this.args.clients.entries()) {
      const element = pageObject.clients.elements[index];
      assert
        .dom(element)
        .hasAttribute('data-test-client-id', client.clientId.toString());
    }
  });

  test('it shows a message when there are no clients', async function (assert) {
    this.args.clients = [];

    await render(hbs`
      <Page::Client::Index @clients={{this.args.clients}} />
    `);

    assert.notOk(pageObject.clients.length);
    assert.dom(pageObject.noClient.element).isVisible();
  });
});
