import { fillIn, render, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'phorest-techtest-paulo-oliveira/tests/helpers';
import { VoucherManagerPageObject } from 'phorest-techtest-paulo-oliveira/tests/page-objects';
import { module, test } from 'qunit';

const pageObject = new VoucherManagerPageObject();

module('Integration | Component | voucher-manager', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.args = {
      client: {
        clientId: 'cGTh2vCF3HePjT4vQPVSSg',
      },
    };
  });

  test('it does not accept splat attributes', async function (assert) {
    await render(hbs`
      <VoucherManager @client={{this.args.client}} data-splat />
    `);

    assert.dom(pageObject.element).doesNotHaveAttribute('data-splat');
  });

  test('it does not yield to dynamic content', async function (assert) {
    await render(hbs`
      <VoucherManager @client={{this.args.client}}>
        <div id="dynamic-content"></div>
      </VoucherManager>
    `);

    assert.dom('#dynamic-content').doesNotExist();
  });

  test('it loads and shows the vouchers', async function (assert) {
    await render(hbs`<VoucherManager @client={{this.args.client}} />`);
    await waitFor(pageObject.vouchers.selector);

    assert.dom(pageObject.vouchers[0].element).isVisible();
  });

  test('it shows a loading message', async function (assert) {
    await render(hbs`<VoucherManager @client={{this.args.client}} />`);

    assert.dom(pageObject.loading.element).isVisible();
  });

  test('it shows a message when there are no vouchers', async function (assert) {
    this.args.client.clientId = 'inexistent';

    await render(hbs`<VoucherManager @client={{this.args.client}} />`);
    await waitFor(pageObject.noVoucher.selector);

    assert.dom(pageObject.noVoucher.element).isVisible();
  });

  test('it creates a new voucher', async function (assert) {
    await render(hbs`<VoucherManager @client={{this.args.client}} />`);
    await waitFor(pageObject.vouchers.selector);

    const firstVoucherId = pageObject.vouchers[0].element.getAttribute(
      'data-test-voucher-id'
    );
    await fillIn(pageObject.newVoucher.element, '555.55');
    const newFirstVoucherId = pageObject.vouchers[0].element.getAttribute(
      'data-test-voucher-id'
    );

    assert.notStrictEqual(firstVoucherId, newFirstVoucherId);
    assert.dom(pageObject.vouchers[0].element).containsText('555.55');
  });
});
