var formCadastro = document.getElementById("form-cadastro");
var campoEmail = document.getElementById("email");
var campoSenha = document.getElementById("senha");
var campoConfirmacao = document.getElementById("confirmacao");
var campoNome = document.getElementById("nome");
var campoCpf = document.getElementById("cpf");
var campoNascimento = document.getElementById("nascimento");
var campoTelefone = document.getElementById("telefone");
var campoEscolaridade = document.getElementById("escolaridade");
var botaoLimpar = document.getElementById("botao-limpar");
var botaoVoltar = document.getElementById("botao-voltar");
var mensagem = document.getElementById("mensagem");

document.getElementById("instrucoes-senha").textContent = TEXTO_INSTRUCOES_SENHA;

aplicarMascara(campoCpf, formatarCPF);
aplicarMascara(campoTelefone, formatarTelefone);

formCadastro.addEventListener("submit", function (evento) {
  evento.preventDefault();

  var erros = []
    .concat(errosDeEmail(campoEmail.value))
    .concat(errosDeSenha(campoSenha.value))
    .concat(errosDeConfirmacao(campoSenha.value, campoConfirmacao.value))
    .concat(errosDeNome(campoNome.value))
    .concat(errosDeCPF(campoCpf.value))
    .concat(errosDeDataNascimento(campoNascimento.value, new Date()))
    .concat(errosDeTelefone(campoTelefone.value));

  var usuarios = obterUsuariosCadastrados();
  if (buscarUsuarioPorEmail(campoEmail.value, usuarios)) {
    erros.push("Já existe um cadastro com este e-mail. Use outro e-mail ou acesse o login.");
  }

  if (erros.length === 0) {
    usuarios.push({
      email: campoEmail.value.trim(),
      senha: campoSenha.value,
      nome: campoNome.value.trim()
    });
    salvarUsuariosCadastrados(usuarios);
    mostrarMensagem(mensagem, [], "Cadastro realizado com sucesso. Agora você já pode fazer login.");
    return;
  }

  mostrarMensagem(mensagem, erros, "Validação realizada com sucesso");
});

botaoLimpar.addEventListener("click", function () {
  campoEmail.value = "";
  campoSenha.value = "";
  campoConfirmacao.value = "";
  campoNome.value = "";
  campoCpf.value = "";
  campoNascimento.value = "";
  campoTelefone.value = "";
  document.querySelector('input[name="estado-civil"][value="solteiro"]').checked = true;
  campoEscolaridade.value = "2grau-completo";
  limparMensagem(mensagem);
  campoEmail.focus();
});

botaoVoltar.addEventListener("click", function () {
  voltarParaPaginaAnterior("login.html");
});
