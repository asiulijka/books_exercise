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
  }



  render();
  initActions();


}
