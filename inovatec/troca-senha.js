var formTroca = document.getElementById("form-troca");
var campoLogin = document.getElementById("login");
var campoSenha = document.getElementById("senha");
var campoConfirmacao = document.getElementById("confirmacao");
var botaoLimpar = document.getElementById("botao-limpar");
var mensagem = document.getElementById("mensagem");

document.getElementById("instrucoes-senha").textContent = TEXTO_INSTRUCOES_SENHA;

formTroca.addEventListener("submit", function (evento) {
  evento.preventDefault();

  var erros = []
    .concat(errosDeEmail(campoLogin.value))
    .concat(errosDeSenha(campoSenha.value))
    .concat(errosDeConfirmacao(campoSenha.value, campoConfirmacao.value));

  mostrarMensagem(mensagem, erros, "Validação realizada com sucesso");

  if (erros.length === 0) {
    setTimeout(function () {
      voltarParaPaginaAnterior("login.html");
    }, 1200);
  }
});

botaoLimpar.addEventListener("click", function () {
  campoLogin.value = "";
  campoSenha.value = "";
  campoConfirmacao.value = "";
  limparMensagem(mensagem);
  campoLogin.focus();
});
