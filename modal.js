var enlaceAbrirModal = document.getElementById("abrirModal");
var miModal = document.getElementById("miModal");
var spanCerrar = document.getElementsByClassName("cerrar")[0];

enlaceAbrirModal.onclick = function() {
  miModal.style.display = "block";
}

spanCerrar.onclick = function() {
  miModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == miModal) {
    miModal.style.display = "none";
  }
}