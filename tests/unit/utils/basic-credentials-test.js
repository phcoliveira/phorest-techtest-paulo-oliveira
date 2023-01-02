import basicCredentials from 'phorest-techtest-paulo-oliveira/utils/basic-credentials';
import { module, test } from 'qunit';

module('Unit | Utility | basic-credentials', function () {
  test('it encodes the "username" and "password" in base 64', function (assert) {
    const password = 'bar';
    const username = 'foo';

    const credentials = basicCredentials(username, password);
    assert.strictEqual(
      credentials,
      'Zm9vOmJhcg==',
      'Credentials should match the correct value'
    );

    const decodedCredentials = atob(credentials);
    assert.strictEqual(
      decodedCredentials,
      'foo:bar',
      'Decoded credentials should match the correct format'
    );
  });
});
