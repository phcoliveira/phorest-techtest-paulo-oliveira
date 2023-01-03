import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ClientIndexController extends Controller {
  queryParams = [{ pageNumber: 'page' }];

  @tracked
  pageNumber = 0;

  @action
  paginate(pageNumber) {
    this.pageNumber = pageNumber;
  }
}
