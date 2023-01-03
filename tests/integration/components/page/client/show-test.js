import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'phorest-techtest-paulo-oliveira/tests/helpers';
import { PageClientShowPageObject } from 'phorest-techtest-paulo-oliveira/tests/page-objects';
import { module, test } from 'qunit';

const pageObject = new PageClientShowPageObject();

module('Integration | Component | page/client/show', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.args = {
      client: {
        clientId: 1,
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  });

  test('it doest accept splat attributes', async function (assert) {
    await render(hbs`
      <Page::Client::Show @client={{this.args.client}} data-splat />
    `);

    assert.dom(pageObject.element).doesNotHaveAttribute('data-splat');
  });

  test('it does not yield to dynamic content', async function (assert) {
    await render(hbs`
      <Page::Client::Show @client={{this.args.client}}>
        <div id="dynamic-content"></div>
      </Page::Client::Show>
    `);

    assert.dom('#dynamic-content').doesNotExist();
  });

  test("it shows the client's full name", async function (assert) {
    await render(hbs`<Page::Client::Show @client={{this.args.client}} />`);

    const { firstName, lastName } = this.args.client;
    const fullName = `${firstName} ${lastName}`;
    assert.dom(pageObject.fullName.element).hasText(fullName);
  });
});
