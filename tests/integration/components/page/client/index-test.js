import { click, render } from '@ember/test-helpers';
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
      onPaginate: function () {},
      page: {
        number: 0,
        totalPages: 1,
      },
    };
  });

  test('it does not accept splat attributes', async function (assert) {
    await render(hbs`
      <Page::Client::Index
        @clients={{this.args.clients}}
        @onPaginate={{this.args.onPaginate}}
        @page={{this.args.page}}
        data-splat
      />
    `);

    assert.dom(pageObject.element).doesNotHaveAttribute('data-splat');
  });

  test('it does not yield to dynamic content', async function (assert) {
    await render(hbs`
      <Page::Client::Index
        @clients={{this.args.clients}}
        @onPaginate={{this.args.onPaginate}}
        @page={{this.args.page}}
      >
        <div id="dynamic-content"></div>
      </Page::Client::Index>
    `);

    assert.dom('#dynamic-content').doesNotExist();
  });

  test('it shows all clients', async function (assert) {
    await render(hbs`
      <Page::Client::Index
        @clients={{this.args.clients}}
        @onPaginate={{this.args.onPaginate}}
        @page={{this.args.page}}
      />
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
      <Page::Client::Index
        @clients={{this.args.clients}}
        @onPaginate={{this.args.onPaginate}}
        @page={{this.args.page}}
      />
    `);

    assert.notOk(pageObject.clients.length);
    assert.dom(pageObject.noClient.element).isVisible();
  });

  test('it shows pagination controls when appropriate', async function (assert) {
    this.args.onPaginate = function (pageNumber) {
      assert.step(pageNumber.toString());
    };

    await render(hbs`
      <Page::Client::Index
        @clients={{this.args.clients}}
        @onPaginate={{this.args.onPaginate}}
        @page={{this.args.page}}
      />
    `);

    assert.dom(pageObject.pagination.element).doesNotExist();

    this.set('args.page', { number: 1, totalPages: 2 });
    assert.dom(pageObject.pagination.element).exists();
    assert.dom(pageObject.currentPage.element).hasText('2');
    assert.dom(pageObject.goBack.element).doesNotHaveAttribute('disabled');
    assert.dom(pageObject.goForward.element).hasAttribute('disabled');

    this.set('args.page', { number: 0, totalPages: 2 });
    assert.dom(pageObject.pagination.element).exists();
    assert.dom(pageObject.currentPage.element).hasText('1');
    assert.dom(pageObject.goBack.element).hasAttribute('disabled');
    assert.dom(pageObject.goForward.element).doesNotHaveAttribute('disabled');

    this.set('args.page', { number: 1, totalPages: 3 });
    assert.dom(pageObject.pagination.element).exists();
    assert.dom(pageObject.currentPage.element).hasText('2');
    assert.dom(pageObject.goBack.element).doesNotHaveAttribute('disabled');
    assert.dom(pageObject.goForward.element).doesNotHaveAttribute('disabled');

    await click(pageObject.goBack.element);
    await click(pageObject.goForward.element);

    assert.verifySteps(['0', '2']);
  });
});
