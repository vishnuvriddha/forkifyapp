import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // Page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      return this._generateMarkupNextbtn(currPage);
    }

    // Last Page
    if (currPage === numPages && numPages > 1) {
      return this._generateMarkupPrevbtn(currPage);
    }
    // Any other page
    if (currPage < numPages) {
      return (
        this._generateMarkupNextbtn(currPage) +
        this._generateMarkupPrevbtn(currPage)
      );
    }

    // Page 1, no other pages
    return '';
  }

  _generateMarkupPrevbtn(currPage) {
    return `
      <button data-goto = "${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
      </button>
        `;
  }
  _generateMarkupNextbtn(currPage) {
    return `
    <button data-goto="${
      currPage + 1
    }"class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
    `;
  }
}

export default new PaginationView();
