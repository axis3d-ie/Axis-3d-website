
// Declare modal variables globally
var modalP, modalG, modalO;

// Initialize modals when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    modalP = document.getElementById("ModalP");
    modalG = document.getElementById("ModalG");
    modalO = document.getElementById("ModalO");
});

// When the user clicks the button, open the modal 
function openP() {
  if (modalP) modalP.style.display = "block";
}
function openG() {
  if (modalG) modalG.style.display = "block";
}
function openO() {
  if (modalO) modalO.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function close() {
  if (modalP) modalP.style.display = "none";
  if (modalG) modalG.style.display = "none";
  if (modalO) modalO.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalP || event.target == modalG || event.target == modalO) {
    if (modalP) modalP.style.display = "none";
    if (modalG) modalG.style.display = "none";
    if (modalO) modalO.style.display = "none";
  }
}
