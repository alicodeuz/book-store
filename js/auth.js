function signUp(event) {
  event.preventDefault();

  const bookForm = document.getElementById('sign-up');
  const { email, password, phone, firstName, lastName } = bookForm;
  const user = {
    email: email.value,
    password: password.value,
    phone: phone.value,
    firstName: firstName.value,
    lastName: lastName.value
  };
  console.log(user);

  var requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  fetch("http://book.alitechbot.uz/api/sign-up", requestOptions)
    .then(response => response.json())
    .then(result => {
      if (typeof result === 'object') {
        Swal.fire({
          title: 'Logged in',
          text: 'Your are logged in successfully',
          icon: 'success',
          showCancelButton: true,
          showCloseButton: true,
          timer: 3000
        });

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
    .catch(error => console.log('error', error));
}

function login(event) {
  event.preventDefault();

  const bookForm = document.getElementById('login');
  const { email, password } = bookForm;
  const user = {
    email: email.value,
    password: password.value,
  };
  console.log(user);

  var requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  fetch("http://book.alitechbot.uz/api/login", requestOptions)
    .then(response => response.json())
    .then(result => {
      if (typeof result === 'object') {
        Swal.fire({
          title: 'Logged in',
          text: 'Your are logged in successfully',
          icon: 'success',
          showCancelButton: true,
          showCloseButton: true,
          timer: 3000
        });

      } else {

      }
    })
    .catch(error => {
      Swal.fire({
        title: 'Hatolik',
        text: error.message,
        icon: 'error',
        showCancelButton: true,
        showCloseButton: true,
        timer: 5000
      })
    });
}