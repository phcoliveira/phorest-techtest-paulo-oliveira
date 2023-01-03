import { service } from '@ember/service';
import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  @service('router')
  routerService;

  redirect() {
    this.routerService.replaceWith('client');
  }
}
