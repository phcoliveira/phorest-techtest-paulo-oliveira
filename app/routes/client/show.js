import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ClientShowRoute extends Route {
  @service('router')
  routerService;

  model() {
    this.routerService.replaceWith('client.index');
  }

  serialize(model) {
    return { client_id: model.clientId };
  }
}
