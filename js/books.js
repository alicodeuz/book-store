// import { fetchBooks } from './script.js';

async function addBookForm() {
  const authors = await window.fetchAuthors();
  const authorsOptions = authors.map(item => `<option value=${item._id}>${item.firstName} ${item.lastName}</option>`);
  console.log(authorsOptions)
  const form = `
  <div class="modal" tabindex="-1" id="myModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add new book</h5>
        </div>
        <div class="modal-body">
        <form id="new-book-form">
          <input type="text" name="title" placeholder="Title">
          <input type="number" name="pages" placeholder="Pages">
          <input type="number" name="price" placeholder="Price">
          <input type="url" name="imageLink" placeholder="Image">
          <input type="text" name="country" placeholder="Country">
          <input type="number" name="year" placeholder="Year">
          <select name="author" id="select">
            ${authorsOptions}
          </select>
        </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onclick="createBook()">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  `;

  document.body.innerHTML += form;
  var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
    keyboard: false
  })
  myModal.show();
}

function addAuthorForm() {
  const form = `
  <div class="modal" tabindex="-1" id="myAuthorModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add new book</h5>
        </div>
        <div class="modal-body">
        <form id="new-author-form">
          <input type="text" name="firstName" placeholder="First name">
          <input type="text" name="lastName" placeholder="Last name">
        </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onclick="createAuthor()">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  `;

  document.body.innerHTML += form;
  var myModal = new bootstrap.Modal(document.getElementById('myAuthorModal'), {
    keyboard: false
  })
  myModal.show();
}

function createBook() {
  const bookForm = document.getElementById('new-book-form');
  const { title, pages, imageLink, author, year, country, price } = bookForm;
  const book = {
    title: title.value,
    pages: pages.value,
    imageLink: imageLink.value,
    author: author.value,
    year: year.value,
    country: country.value,
    price: price.value
  };
  console.log(book);
  const token = localStorage.token;
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(book),
    redirect: 'follow'
  };

  fetch("http://book.alitechbot.uz/api/books", requestOptions)
    .then(response => {
      if (response.status >= 400 || response.status >= 500) {
        handleErrors({ status: response.status });
      }
      return response.json()
    })
    .then(result => {

      if (typeof result === 'object') {
        window.Swal.fire({
          title: 'Kitob yuklandi',
          text: 'Siz taqdim qilgan kitob yaratildi',
          icon: 'success',
          showCancelButton: true,
          showCloseButton: true,
          timer: 3000
        });

        setTimeout(function () {
          location.pathname = 'index.html';
        }, 1000)

      } else {
        Swal.fire({
          title: 'Hatolik',
          text: result,
          icon: 'error',
          showCancelButton: true,
          showCloseButton: true,
          timer: 5000
        })
      }
    })
    .catch(error => {
      console.log('error')
      // handleErrors({ msg: error.message });
    });
}

function createAuthor() {
  const bookForm = document.getElementById('new-author-form');
  const { lastName, firstName } = bookForm;
  const author = {
    firstName: firstName.value,
    lastName: lastName.value,
  };
  console.log(author);
  const token = localStorage.token;

  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(author),
  };

  fetch("http://book.alitechbot.uz/api/authors", requestOptions)
    .then(response => {
      if (response.status >= 400 || response.status >= 500) {
        handleErrors({ status: response.status });
      }
      return response.json()
    })
    .then(result => {
      location.pathname = 'authors.html';
    })
    .catch(error => console.log('error', error));
}

// window.addBookForm = addBookForm;
// window.addAuthorForm = addAuthorForm;
// window.createAuthor = createAuthor;
// window.createBook = createBook;
// export {
//   addBookForm,
//   addAuthorForm,
// }