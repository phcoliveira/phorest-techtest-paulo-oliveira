import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ClientIndexRoute extends Route {
  @service('api/client')
  apiClientService;

  queryParams = {
    pageNumber: {
      refreshModel: true,
      replace: false,
    },
  };

  async model(params) {
    const { pageNumber } = params;
    const options = {
      page: pageNumber.toString(),
    };

    const response = await this.apiClientService.searchClients(options);
    const payload = await response.json();

    return {
      clients: payload._embedded.clients,
      page: payload.page,
    };
  }
}
