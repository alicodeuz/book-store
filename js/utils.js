const DEFAULT_WRITER_IMAGE = '/assets/images/default-writer.jpeg';
const DEFAULT_BOOK_IMAGE = '/assets/images/default-book.jpg';

function displayError(errorMsg) {
  const errorContainer = document.getElementById('error-wrapper');
  errorContainer.innerHTML = `
    <h3>Server bilan hatolik yuz berdi</h3>
  `;
};

function displayBooks(data = [], element) {
  const el = document.querySelector(element);
  if (!el) {
    const ul = document.createElement('ul');
    document.body.append(ul);
    ul.innerHTML = '';
    data.forEach(item => {
      ul.innerHTML += `
        <div class="row g-0">
          <div class="col-md-4">
            <img src="..." alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      `
    })

  } else {
    el.innerHTML = '';
    data.forEach(item => {
      const { imageLink, title, description = '', year, _id } = item;

      el.innerHTML += `
        <a href="book-details.html?id=${_id}" class="row g-0">
          <div class="col-md-4">
            <img src="${getValidImage(imageLink)}" onerror={} alt="${title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${description}</p>
              <p class="card-text"><small class="text-muted">${year}</small></p>
            </div>
          </div>
        </a>
      `
    })
  }
}

function displayAuthors(data = [], element) {
  const el = document.querySelector(element);
  if (!el) {
    const ul = document.createElement('ul');
    document.body.append(ul);
    ul.innerHTML = '';
    data.forEach(item => {
      ul.innerHTML += `
        <div class="row g-0">
          <div class="col-md-4">
            <img src="..." alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      `
    })

  } else {
    el.innerHTML = '';
    data.forEach(item => {
      const { _id, imageLink, firstName, description, lastName, phone } = item;

      el.innerHTML += `
        <a href="author-details.html?id=${_id}" class="row g-0">
          <div class="col-md-4">
            <img src="${getValidImage(imageLink, true)}" alt="${firstName}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${`${firstName} ${lastName}`}</h5>
              <p class="card-text">${description}</p>
              <p class="card-text"><small class="text-muted">${phone}</small></p>
            </div>
          </div>
        </a>
      `
    })
  }
}

function displayBookById(data = [], element) {
  const el = document.querySelector(element);
  const { _id, imageLink, title, price, description, author } = data;

  el.innerHTML = `
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${getValidImage(imageLink)}" alt="${title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${`${title}`}</h5>
              <p class="card-text">${description || ''}</p>
              <p class="card-text"><small class="text-muted">${price}</small></p>
              <a href="author-details.html?id=${author._id}">Author: ${author.firstName || ''} ${author.lastName || ''}</a>
            </div>
          </div>
        </div>
      `;
}

function displayAuthorById(data = [], element) {
  const el = document.querySelector(element);

  const { _id, imageLink, firstName, description, lastName, phone } = data;
  el.innerHTML = `
        <a href="author-details.html?id=${_id}" class="row g-0">
          <div class="col-md-4">
            <img src="${getValidImage(imageLink)}" alt="${firstName}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${`${firstName} ${lastName}`}</h5>
              <p class="card-text">${description}</p>
              <p class="card-text"><small class="text-muted">${phone}</small></p>
            </div>
          </div>
        </a>
      `;
}

function displaySpinner(loading = true) {
  const spinner = `<div id="spinner-wrapper">
    <div class="spinner-border text-dark" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`;

  if (loading) {
    document.body.innerHTML += spinner;
  } else {
    const spinner = document.getElementById('spinner-wrapper');
    document.body.removeChild(spinner);
  }
};

function getValidImage(img, isWriter) {
  const validImageTypes = (/\.(gif|jpe?g|png|webp|bmp|svg)$/i).test(img);

  if (img === '' || !validImageTypes) {
    return isWriter ? DEFAULT_WRITER_IMAGE : DEFAULT_BOOK_IMAGE;
  }

  return img;
}

function handleErrors({ status, msg }) {
  if (status >= 500) {
    // Server errors
    Swal.fire({
      text: 'Server not responding',
      icon: 'error'
    });
  } else if (status === 401) {
    // Not logged in or token expired
    Swal.fire({
      title: 'Not Logged in',
      text: 'You need to login or sign up',
      icon: 'error'
    });
    localStorage.removeItem('token');
  } else if (status === 403) {
    // You are not authorized for this action
    Swal.fire({
      text: 'You are not authorized to do this action',
      icon: 'error'
    });
  } else if (status >= 400) {
    Swal.fire({
      text: msg,
      icon: 'error'
    });
  } else {
    Swal.fire({
      text: msg,
      icon: 'error'
    });
  }

}

window.handleErrors = handleErrors;

export {
  displayError,
  displayBooks,
  displayAuthors,
  displaySpinner,
  displayAuthorById,
  displayBookById,
  handleErrors,
}