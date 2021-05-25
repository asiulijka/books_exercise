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
        console.log(elemValue);

        if(clickedElem.checked){
          console.log('is clicked');
          filters.push(elemValue);
          console.log(filters);
        }else{
          console.log('is not clicked');

          const indexToRemove = filters.indexOf(elemValue);


          filters.splice(indexToRemove, 1);
          console.log(filters);
        }


      }

    });

  }



  render();
  initActions();


}
