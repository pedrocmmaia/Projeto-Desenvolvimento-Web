var formLogin = document.getElementById("form-login");
var campoLogin = document.getElementById("login");
var campoSenha = document.getElementById("senha");
var botaoLimpar = document.getElementById("botao-limpar");
var mensagem = document.getElementById("mensagem");

formLogin.addEventListener("submit", function (evento) {
  evento.preventDefault();

  localStorage.removeItem("inovatec_logado");
  localStorage.removeItem("inovatec_login");

  var erros = errosDeEmail(campoLogin.value).concat(
    campoSenha.value === "" ? ["A senha deve ser preenchida."] : []
  );

  var usuario = buscarUsuarioPorEmail(campoLogin.value);
  if (erros.length === 0 && !usuario) {
    erros.push("Este e-mail ainda não possui cadastro. Cadastre-se antes de fazer login.");
  } else if (erros.length === 0 && usuario.senha !== campoSenha.value) {
    erros.push("E-mail ou senha incorretos.");
  }

  mostrarMensagem(mensagem, erros, "Validação realizada com sucesso");

  if (erros.length === 0) {
    localStorage.setItem("inovatec_logado", "true");
    localStorage.setItem("inovatec_login", campoLogin.value.trim());
    setTimeout(function () {
      window.location.href = "institucional.html";
    }, 1200);
  }
});

botaoLimpar.addEventListener("click", function () {
  campoLogin.value = "";
  campoSenha.value = "";
  limparMensagem(mensagem);
  campoLogin.focus();
});
