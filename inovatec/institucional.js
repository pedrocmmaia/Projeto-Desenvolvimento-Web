document.addEventListener("DOMContentLoaded", function () {
  var linkSolicitar = document.getElementById("link-solicitar");
  var estaLogado = localStorage.getItem("inovatec_logado") === "true";

  if (estaLogado) {
    linkSolicitar.classList.remove("oculto");
  }
});
