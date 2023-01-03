import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ClientIndexController extends Controller {
  queryParams = [{ pageNumber: 'page' }, 'email', 'phone'];

  @tracked
  email = '';

  @tracked
  pageNumber = 0;

  @tracked
  phone = '';

  @action
  paginate(pageNumber) {
    this.pageNumber = pageNumber;
  }

  @action
  search(searchTerm) {
    if (/@/.test(searchTerm)) {
      this.email = searchTerm;
      this.phone = '';
    } else {
      this.email = '';
      this.phone = searchTerm;
    }
  }
}
