import EmberRouter from '@ember/routing/router';
import config from 'phorest-techtest-paulo-oliveira/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('client', function () {
    this.route('show', { path: '/:client_id' });
  });
});
