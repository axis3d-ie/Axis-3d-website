
var modal = document.getElementById("ModalP");

// When the user clicks the button, open the modal 
function openP() {
  alert("test")
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function close() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
