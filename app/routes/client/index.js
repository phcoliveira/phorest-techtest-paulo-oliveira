import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ClientIndexRoute extends Route {
  @service('api/client')
  apiClientService;

  async model() {
    const response = await this.apiClientService.searchClients();
    const payload = await response.json();

    return {
      clients: payload._embedded.clients,
      page: payload.page,
    };
  }
}
