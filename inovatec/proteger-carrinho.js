(function () {
  var email = "";
  var logado = false;
  var usuarios;
  var contaExiste = false;

  try {
    email = localStorage.getItem("inovatec_login") || "";
    logado = localStorage.getItem("inovatec_logado") === "true";
    usuarios = JSON.parse(localStorage.getItem("inovatec_usuarios") || "[]");
    contaExiste = Array.isArray(usuarios) && usuarios.some(function (usuario) {
      return usuario && typeof usuario.email === "string" && usuario.email.toLowerCase() === email.toLowerCase();
    });
  } catch (erro) {
    contaExiste = false;
  }

  if (!logado || !email || !contaExiste) {
    try {
      localStorage.removeItem("inovatec_logado");
      localStorage.removeItem("inovatec_login");
    } catch (erro) {
      // O redirecionamento ainda deve ocorrer se o armazenamento estiver bloqueado.
    }
    window.location.replace("login.html");
  }
})();
