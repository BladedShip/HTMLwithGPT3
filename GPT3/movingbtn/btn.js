let button = document.getElementById("myButton");
button.addEventListener("mouseover", moveAway);

function moveAway() {
  button.style.left = Math.random() * 100 + "%";
  button.style.top = Math.random() * 100 + "%";
}
