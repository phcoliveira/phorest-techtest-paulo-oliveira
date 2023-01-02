import Service from '@ember/service';
import ENV from 'phorest-techtest-paulo-oliveira/config/environment';
import basicCredentials from 'phorest-techtest-paulo-oliveira/utils/basic-credentials';

export default class ApiClientService extends Service {
  async searchClients() {
    const url = `${ENV.apiURL}/third-party-api-server/api/business/${ENV.defaultBusinessId}/client`;
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
