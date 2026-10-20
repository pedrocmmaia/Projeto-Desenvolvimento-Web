document.addEventListener("DOMContentLoaded", function () {
  var linkSolicitar = document.getElementById("link-solicitar");
  var emailLogado = localStorage.getItem("inovatec_login") || "";
  var usuarioLogado = buscarUsuarioPorEmail(emailLogado);
  var estaLogado = localStorage.getItem("inovatec_logado") === "true" && usuarioLogado !== null;

  if (estaLogado) {
    linkSolicitar.classList.remove("oculto");
  } else {
    localStorage.removeItem("inovatec_logado");
    localStorage.removeItem("inovatec_login");
  }
});
