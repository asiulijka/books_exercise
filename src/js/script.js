{
  'use strict';

  const select = {
    templateOf: {
      book:'#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      filters: '.filters',
    },
    all: {
      bookImage: '.books-list .book__image',
    },
    book: {
      dataId: function(id){
        return 'a[data-id="' + id + '"]';
      }
    }
  };

  const classNames = {
    book: {
      wrapperHidden: 'hidden',
    }
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };


  class BooksList {
    constructor() {
      const thisBookList = this;

      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];

      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.initActions();

    }

    initData() {
      this.data = dataSource.books;
    }

    getElements() {
      const thisBookList = this;

      thisBookList.bookList = document.querySelector(select.containerOf.bookList);
      thisBookList.bookFilters = document.querySelector(select.containerOf.filters);
    }

    render() {
      const thisBookList = this;

      for(const book of thisBookList.data){

        book.ratingBgc = thisBookList.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;

        const generatedHTML = templates.bookTemplate(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);

        thisBookList.bookList.appendChild(generatedDOM);
      }
    }

    determineRatingBgc(rating) {
      if(rating <= 6){
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';

      }else if(rating > 6 && rating <= 8){
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';

      }else if(rating > 8 && rating <= 9){
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';

      }else{
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
    }

    initActions() {
      const thisBookList = this;

      thisBookList.bookList.addEventListener('dblclick', function(event){
        event.preventDefault();

        if(event.target.offsetParent.classList.contains('book__image')){

          const favoriteId = event.target.offsetParent.getAttribute('data-id');

          if(thisBookList.favoriteBooks.indexOf(favoriteId)==(-1)){
            event.target.offsetParent.classList.add('favorite');
            thisBookList.favoriteBooks.push(favoriteId);
          }else{
            event.target.offsetParent.classList.remove('favorite');
            const indexToRemove = thisBookList.favoriteBooks.indexOf(favoriteId);
            thisBookList.favoriteBooks.splice(indexToRemove, 1);
          }
        }
      });

      thisBookList.bookFilters.addEventListener('click', function(event){
        const clickedElem = event.target;
        const isInput = clickedElem.tagName == 'INPUT';
        const isCheckbox = clickedElem.getAttribute('type') == 'checkbox';
        const isFilter = clickedElem.getAttribute('name') == 'filter';

        const elemValue = clickedElem.getAttribute('value');

        if(isInput && isCheckbox && isFilter){
          if(clickedElem.checked){
            thisBookList.filters.push(elemValue);
          }else{
            const indexToRemove = thisBookList.filters.indexOf(elemValue);
            thisBookList.filters.splice(indexToRemove, 1);
          }

          thisBookList.filterBooks();
        }
      });
    }

    filterBooks() {
      const thisBookList = this;

      for(const book of thisBookList.data){
        let shouldBeHidden = false;
        const thisBookId = book.id;

        for (const filter of thisBookList.filters){
          if(!book.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }

        if(shouldBeHidden){
          document.querySelector(select.book.dataId(thisBookId)).classList.add(classNames.book.wrapperHidden);
        }else{
          document.querySelector(select.book.dataId(thisBookId)).classList.remove(classNames.book.wrapperHidden);
        }
      }
    }
  }

  const app = new BooksList();

}
