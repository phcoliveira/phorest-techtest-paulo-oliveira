import Service from '@ember/service';
import ENV from 'phorest-techtest-paulo-oliveira/config/environment';
import basicCredentials from 'phorest-techtest-paulo-oliveira/utils/basic-credentials';

export default class ApiClientService extends Service {
  async searchClients(options = {}) {
    const { email, page, phone } = options;
    const url = new URL(
      `/third-party-api-server/api/business/${ENV.defaultBusinessId}/client`,
      ENV.apiURL
    );

    url.searchParams.append('size', '10');
    url.searchParams.append('page', page);

    if (email) {
      url.searchParams.append('email', email);
    }

    if (phone) {
      url.searchParams.append('phone', phone);
    }

    const { password, username } = ENV.defaultCredentials;

    return await fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${basicCredentials(username, password)}`,
      },
      method: 'GET',
    });
  }
}
