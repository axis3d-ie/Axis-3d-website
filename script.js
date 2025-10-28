
// load the modals as variables
document.addEventListener('DOMContentLoaded', function() {
    var modalP = document.getElementById("ModalP");
    var modalG = document.getElementById("ModalG");
    var modalO = document.getElementById("ModalO");

});

// When the user clicks the button, open the modal 
function openP() {
  modalP.style.display = "block";
}
function openG() {
  modalG.style.display = "block";
}
function openO() {
  modalO.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function close() {
  modalP.style.display = "none";
  modalG.style.display = "none";
  modalO.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modalP.style.display = "none";
    modalG.style.display = "none";
    modalO.style.display = "none";
  }
}
