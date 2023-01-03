import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ClientIndexRoute extends Route {
  @service('api/client')
  apiClientService;

  queryParams = {
    email: {
      refreshModel: true,
      replace: true,
    },
    pageNumber: {
      refreshModel: true,
      replace: false,
    },
    phone: {
      refreshModel: true,
      replace: true,
    },
  };

  async model(params) {
    const { email, pageNumber, phone } = params;
    const options = {
      email,
      page: pageNumber.toString(),
      phone,
    };

    const response = await this.apiClientService.searchClients(options);
    const payload = await response.json();

    return {
      clients: payload._embedded.clients,
      page: payload.page,
    };
  }
}
