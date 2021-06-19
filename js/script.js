import { displayError, displayBooks, displayBookById, displayAuthors, displaySpinner, displayAuthorById } from './utils.js';

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
  return fetch('http://book.alitechbot.uz/api/authors')
    .then(res => res.json())
    .then(data => {
      displayAuthors(data, '#books');
      displaySpinner(false);
      console.log(data, '------')
      return data;
    })
    .catch(err => {
      console.log(err);
      displayError(err.message);
      displaySpinner(false);
    })
}

function fetchBookById() {
  var query = new URLSearchParams(location.search);
  const id = query.get('id');
  displaySpinner(true);
  fetch(`http://book.alitechbot.uz/api/books/${id}`)
    .then(res => res.json())
    .then(data => {
      displayBookById(data, '#book');
      console.log(data)
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
  const id = new URLSearchParams(location.search).get('id');
  if (currentPage === '/authors.html') {
    fetchAuthors()
  } else if (currentPage.startsWith('/author-details.html')) {
    fetchAuthorById(id);
  } else if (currentPage.startsWith('/book-details.html')) {
    fetchBookById(id)
  } else {
    fetchBooks()
  }
}


window.fetchAuthors = fetchAuthors;
export {
  fetchAuthorById,
  fetchBooks,
  fetchAuthors,
  fetchBookById,
}
