{
  'use strict';

  const select = {
    templateOf: {
      book:'#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    },
    all: {
      bookImage: '.books-list .book__image',
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

  function initActions(){

    for(const bookImage of document.querySelectorAll(select.all.bookImage)){
      bookImage.addEventListener('dblclick', function(event){
        event.preventDefault();
        bookImage.classList.add('favorite');

        const favoriteId = bookImage['data-id'];
        favoriteBooks.push(favoriteId);
      });
    }

  }





  render();
  initActions();



}
