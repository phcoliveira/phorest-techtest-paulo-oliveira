import Service from '@ember/service';
import { setupTest } from 'phorest-techtest-paulo-oliveira/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Route | client/show', function (hooks) {
  setupTest(hooks);

  module('instance.model()', function () {
    test('it replaces with the route "client.index"', function (assert) {
      this.owner.register(
        'service:router',
        class extends Service {
          replaceWith(routeName) {
            assert.step(routeName);
          }
        }
      );

      const route = this.owner.lookup('route:client/show');
      route.model();
      assert.verifySteps(['client.index']);
    });
  });
});
