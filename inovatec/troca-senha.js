var formTroca = document.getElementById("form-troca");
var campoLogin = document.getElementById("login");
var campoSenhaAtual = document.getElementById("senha-atual");
var campoSenha = document.getElementById("senha");
var campoConfirmacao = document.getElementById("confirmacao");
var botaoLimpar = document.getElementById("botao-limpar");
var mensagem = document.getElementById("mensagem");

document.getElementById("instrucoes-senha").textContent = TEXTO_INSTRUCOES_SENHA;

formTroca.addEventListener("submit", function (evento) {
  evento.preventDefault();

  var erros = []
    .concat(errosDeEmail(campoLogin.value))
    .concat(campoSenhaAtual.value === "" ? ["A senha atual deve ser preenchida."] : [])
    .concat(errosDeSenha(campoSenha.value))
    .concat(errosDeConfirmacao(campoSenha.value, campoConfirmacao.value));

  var usuarios = obterUsuariosCadastrados();
  var usuario = buscarUsuarioPorEmail(campoLogin.value, usuarios);
  if (erros.length === 0 && !usuario) {
    erros.push("Este e-mail ainda não possui cadastro.");
  } else if (erros.length === 0 && usuario.senha !== campoSenhaAtual.value) {
    erros.push("A senha atual está incorreta.");
  } else if (erros.length === 0 && usuario.senha === campoSenha.value) {
    erros.push("A nova senha deve ser diferente da senha atual.");
  }

  mostrarMensagem(mensagem, erros, "Validação realizada com sucesso");

  if (erros.length === 0) {
    usuario.senha = campoSenha.value;
    salvarUsuariosCadastrados(usuarios);
    mostrarMensagem(mensagem, [], "Senha alterada com sucesso.");
    setTimeout(function () {
      voltarParaPaginaAnterior("login.html");
    }, 1200);
  }
});

botaoLimpar.addEventListener("click", function () {
  campoLogin.value = "";
  campoSenhaAtual.value = "";
  campoSenha.value = "";
  campoConfirmacao.value = "";
  limparMensagem(mensagem);
  campoLogin.focus();
});
