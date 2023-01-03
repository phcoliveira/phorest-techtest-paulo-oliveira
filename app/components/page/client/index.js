import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class PageClientIndexComponent extends Component {
  /**
   * For brevity and demonstration purposes, the types will not be defined.
   *
   * args:
   * - clients: Client[]
   * - page: Page
   * - onPaginate: (pageNumber: number) => unknown
   */

  get currentPageNumber() {
    return this.args.page.number;
  }

  get currentPageNumberForDisplay() {
    return this.currentPageNumber + 1;
  }

  get lastPageNumber() {
    return this.args.page.totalPages - 1;
  }

  get canPaginateBack() {
    return Boolean(this.currentPageNumber);
  }

  get canPaginateForward() {
    return this.currentPageNumber < this.lastPageNumber;
  }

  get canPaginate() {
    return this.canPaginateBack || this.canPaginateForward;
  }

  @action
  goBack() {
    this.args.onPaginate(this.currentPageNumber - 1);
  }

  @action
  goForward() {
    this.args.onPaginate(this.currentPageNumber + 1);
  }
}
