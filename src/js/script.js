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


  function render(){
    for(const book of dataSource.books){
      const generatedHTML = templates.bookTemplate(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const bookList = document.querySelector(select.containerOf.bookList);
      bookList.appendChild(generatedDOM);
    }
  }

  const favoriteBooks = [];
  const filters = [];

  function initActions(){

    document.querySelector(select.containerOf.bookList).addEventListener('dblclick', function(event){
      event.preventDefault();

      if(event.target.offsetParent.classList.contains('book__image')){

        const favoriteId = event.target.offsetParent.getAttribute('data-id');

        if(favoriteBooks.indexOf(favoriteId)==(-1)){
          event.target.offsetParent.classList.add('favorite');
          favoriteBooks.push(favoriteId);
        }else{
          event.target.offsetParent.classList.remove('favorite');
          const indexToRemove = favoriteBooks.indexOf(favoriteId);
          favoriteBooks.splice(indexToRemove, 1);
        }
      }
    });


    document.querySelector(select.containerOf.filters).addEventListener('click', function(event){

      const clickedElem = event.target;
      const isInput = clickedElem.tagName == 'INPUT';
      const isCheckbox = clickedElem.getAttribute('type') == 'checkbox';
      const isFilter = clickedElem.getAttribute('name') == 'filter';

      const elemValue = clickedElem.getAttribute('value');

      if(isInput && isCheckbox && isFilter){
        if(clickedElem.checked){
          filters.push(elemValue);
        }else{
          const indexToRemove = filters.indexOf(elemValue);
          filters.splice(indexToRemove, 1);
        }

        filterBooks();
      }
    });
  }


  function filterBooks(){
    for(const book of dataSource.books){
      let shouldBeHidden = false;
      const thisBookId = book.id;

      for (const filter of filters){
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



  render();
  initActions();


}
