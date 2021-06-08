const DEFAULT_WRITER_IMAGE = '/assets/images/default-writer.jpeg';

function displayError(errorMsg) {
  console.log(errorMsg)
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
      const { imageLink = DEFAULT_WRITER_IMAGE, title, description = '', year } = item;

      el.innerHTML += `
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${imageLink}" alt="${title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${description}</p>
              <p class="card-text"><small class="text-muted">${year}</small></p>
            </div>
          </div>
        </div>
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
      const { _id, imageLink = DEFAULT_WRITER_IMAGE, firstName, description, lastName, phone } = item;

      el.innerHTML += `
        <a href="author-details.html?id=${_id}" class="row g-0">
          <div class="col-md-4">
            <img src="${imageLink}" alt="${firstName}">
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

function displayAuthorById(data = [], element) {
  const el = document.querySelector(element);

  const { _id, imageLink = DEFAULT_WRITER_IMAGE, firstName, description, lastName, phone } = data;
  el.innerHTML = `
        <a href="author-details.html?id=${_id}" class="row g-0">
          <div class="col-md-4">
            <img src="${imageLink}" alt="${firstName}">
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

export {
  displayError,
  displayBooks,
  displayAuthors,
  displaySpinner,
  displayAuthorById,
}