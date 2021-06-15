function checkTokenExist(window) {
  console.log(window)
  if (window.localStorage.token) {
    console.log('Ok')
  } else {
    console.log('No')
  }
};

setInterval(checkTokenExist, 2000, window);

