import { displayError, displayBooks, displayAuthors, displaySpinner, displayAuthorById } from './utils.js';

// Get all books from http://book.alitechbot.uz/api/book
function fetchBooks() {
  displaySpinner(true);
  fetch('http://book.alitechbot.uz/api/books')
    .then(res => res.json())
    .then(data => {
      displayBooks(data, '#books');
      displaySpinner(false);
    })
    .catch(err => {
      console.log(err);
      displayError(err.message);
      displaySpinner(false);
    })
}

function fetchAuthors() {
  displaySpinner(true);
  fetch('http://book.alitechbot.uz/api/authors')
    .then(res => res.json())
    .then(data => {
      displayAuthors(data, '#books');
      displaySpinner(false);
    })
    .catch(err => {
      console.log(err);
      displayError(err.message);
      displaySpinner(false);
    })
}

function fetchAuthorById() {
  var query = new URLSearchParams(location.search);
  const id = query.get('id');
  displaySpinner(true);
  fetch(`http://book.alitechbot.uz/api/authors/${id}`)
    .then(res => res.json())
    .then(data => {
      displayAuthorById(data, '#author');
      console.log(data)
      displaySpinner(false);
    })
    .catch(err => {
      console.log(err);
      displayError(err.message);
      displaySpinner(false);
    })
}


window.onload = function () {
  const currentPage = location.pathname;
  if (currentPage === '/authors.html') {
    fetchAuthors()
  } else if (currentPage.startsWith('/author-details.html')) {
    fetchAuthorById("60bb90e00c28a943be3d16d0");
  } else {
    fetchBooks()
  }
}




