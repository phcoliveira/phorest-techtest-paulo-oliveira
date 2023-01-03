import Service from '@ember/service';
import ENV from 'phorest-techtest-paulo-oliveira/config/environment';
import basicCredentials from 'phorest-techtest-paulo-oliveira/utils/basic-credentials';

export default class ApiVoucherService extends Service {
  async searchVouchers(options = {}) {
    const { clientId, page = 0 } = options;
    const url = new URL(
      `/third-party-api-server/api/business/${ENV.defaultBusinessId}/voucher`,
      ENV.apiURL
    );

    url.searchParams.append('size', '10');
    url.searchParams.append('page', page);

    if (clientId) {
      url.searchParams.append('clientId', clientId);
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

  async createVoucher(voucher) {
    const url = new URL(
      `/third-party-api-server/api/business/${ENV.defaultBusinessId}/voucher`,
      ENV.apiURL
    );

    const { password, username } = ENV.defaultCredentials;

    return await fetch(url, {
      body: JSON.stringify(voucher),
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${basicCredentials(username, password)}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      mode: 'cors',
    });
  }
}
