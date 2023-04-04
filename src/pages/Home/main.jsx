/* slider */
let counter = 1;
setInterval(function () {
  let checkbox = document.getElementById('radio' + counter)
  if (checkbox) {
    checkbox.checked = true
  }
  counter++;
  if (counter > 4) {
    counter = 1
  }
}, 8000);