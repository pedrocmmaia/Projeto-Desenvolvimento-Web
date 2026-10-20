var ESPECIAIS_PERMITIDOS = "@#$%&*!?/\\|-_+.=";
var CARACTERES_NAO_PERMITIDOS = "\u00A8{}[]\u00B4`~^:;<>,\"'\u201C\u201D\u2018\u2019";

function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

function obterUsuariosCadastrados() {
  try {
    var usuarios = JSON.parse(localStorage.getItem("inovatec_usuarios") || "[]");
    return Array.isArray(usuarios) ? usuarios : [];
  } catch (erro) {
    return [];
  }
}

function salvarUsuariosCadastrados(usuarios) {
  localStorage.setItem("inovatec_usuarios", JSON.stringify(usuarios));
}

function buscarUsuarioPorEmail(email, usuarios) {
  var emailNormalizado = email.trim().toLowerCase();
  return (usuarios || obterUsuariosCadastrados()).find(function (usuario) {
    return usuario.email.toLowerCase() === emailNormalizado;
  }) || null;
}

function errosDeEmail(email) {
  if (email.trim() === "") {
    return ["O login (e-mail) deve ser preenchido."];
  }
  if (!emailValido(email)) {
    return ["O login deve ter formato de e-mail válido (ex.: nome@dominio.com)."];
  }
  return [];
}

function errosDeSenha(senha) {
  if (senha === "") {
    return ["A senha deve ser preenchida."];
  }

  var erros = [];

  if (senha.length < 6) {
    erros.push("A senha deve ter pelo menos 6 caracteres.");
  }
  if (!/[0-9]/.test(senha)) {
    erros.push("A senha deve ter pelo menos um caractere numérico.");
  }
  if (!/\p{Lu}/u.test(senha)) {
    erros.push("A senha deve ter pelo menos uma letra maiúscula.");
  }

  var temEspecial = false;
  var proibidosEncontrados = [];
  for (var i = 0; i < senha.length; i++) {
    var c = senha.charAt(i);
    if (ESPECIAIS_PERMITIDOS.indexOf(c) >= 0) {
      temEspecial = true;
    }
    if (CARACTERES_NAO_PERMITIDOS.indexOf(c) >= 0 && proibidosEncontrados.indexOf(c) < 0) {
      proibidosEncontrados.push(c);
    }
  }

  if (!temEspecial) {
    erros.push("A senha deve ter pelo menos um caractere especial permitido: " + ESPECIAIS_PERMITIDOS.split("").join(" "));
  }
  if (proibidosEncontrados.length > 0) {
    erros.push("A senha contém caracteres não permitidos: " + proibidosEncontrados.join(" "));
  }

  return erros;
}

function errosDeConfirmacao(senha, confirmacao) {
  if (confirmacao === "") {
    return ["A confirmação de senha deve ser preenchida."];
  }
  if (senha !== "" && senha !== confirmacao) {
    return ["A confirmação de senha deve ser igual à senha."];
  }
  return [];
}

function contemCaractereEspecial(texto) {
  for (var i = 0; i < texto.length; i++) {
    var c = texto.charAt(i);
    if (ESPECIAIS_PERMITIDOS.indexOf(c) >= 0 || CARACTERES_NAO_PERMITIDOS.indexOf(c) >= 0) {
      return true;
    }
  }
  return false;
}

function errosDeNome(nome) {
  var limpo = nome.trim();
  if (limpo === "") {
    return ["O nome deve ser preenchido."];
  }

  var erros = [];
  var palavras = limpo.split(/\s+/);

  if (palavras.length < 2) {
    erros.push("O nome deve ter pelo menos duas palavras.");
  }
  if (palavras[0].length < 2) {
    erros.push("A primeira palavra do nome deve ter pelo menos 2 caracteres.");
  }
  if (contemCaractereEspecial(limpo)) {
    erros.push("O nome não pode conter caracteres especiais.");
  }

  return erros;
}

function somenteDigitos(texto) {
  return texto.replace(/\D/g, "");
}

function formatarCPF(texto) {
  var d = somenteDigitos(texto).slice(0, 11);
  var resultado = d.slice(0, 3);
  if (d.length > 3) {
    resultado += "." + d.slice(3, 6);
  }
  if (d.length > 6) {
    resultado += "." + d.slice(6, 9);
  }
  if (d.length > 9) {
    resultado += "-" + d.slice(9, 11);
  }
  return resultado;
}

function cpfValido(cpf) {
  var d = somenteDigitos(cpf);
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) {
    return false;
  }

  for (var posicao = 9; posicao < 11; posicao++) {
    var soma = 0;
    for (var i = 0; i < posicao; i++) {
      soma += parseInt(d.charAt(i), 10) * (posicao + 1 - i);
    }
    var digito = (soma * 10) % 11;
    if (digito === 10) {
      digito = 0;
    }
    if (digito !== parseInt(d.charAt(posicao), 10)) {
      return false;
    }
  }
  return true;
}

function errosDeCPF(cpf) {
  if (cpf.trim() === "") {
    return ["O CPF deve ser preenchido."];
  }
  if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
    return ["O CPF deve estar no formato NNN.NNN.NNN-NN."];
  }
  if (!cpfValido(cpf)) {
    return ["O CPF informado não é válido."];
  }
  return [];
}

function calcularIdade(dataNascimento, hoje) {
  var idade = hoje.getFullYear() - dataNascimento.getFullYear();
  var meses = hoje.getMonth() - dataNascimento.getMonth();
  if (meses < 0 || (meses === 0 && hoje.getDate() < dataNascimento.getDate())) {
    idade--;
  }
  return idade;
}

function errosDeDataNascimento(valor, hoje) {
  if (valor === "") {
    return ["A data de nascimento deve ser preenchida."];
  }
  var partes = valor.split("-");
  var data = new Date(parseInt(partes[0], 10), parseInt(partes[1], 10) - 1, parseInt(partes[2], 10));
  if (isNaN(data.getTime())) {
    return ["A data de nascimento é inválida."];
  }
  if (data > (hoje || new Date())) {
    return ["A data de nascimento não pode estar no futuro."];
  }
  if (calcularIdade(data, hoje || new Date()) < 18) {
    return ["O cliente deve ser maior de idade (18 anos ou mais)."];
  }
  return [];
}

function formatarTelefone(texto) {
  var d = somenteDigitos(texto).slice(0, 11);
  if (d.length === 0) {
    return "";
  }
  var resultado = "(" + d.slice(0, 2);
  if (d.length >= 2) {
    resultado += ")";
  }
  if (d.length > 2) {
    resultado += " ";
    if (d.length <= 10) {
      resultado += d.slice(2, 6);
      if (d.length > 6) {
        resultado += "-" + d.slice(6, 10);
      }
    } else {
      resultado += d.slice(2, 7) + "-" + d.slice(7, 11);
    }
  }
  return resultado;
}

function errosDeTelefone(valor) {
  if (valor.trim() === "") {
    return [];
  }
  var d = somenteDigitos(valor);
  var formatoOk = /^\(\d{2}\) \d{4,5}-\d{4}$/.test(valor);
  var dddOk = d.length >= 2 && parseInt(d.slice(0, 2), 10) >= 11;
  var celularOk = d.length === 11 && d.charAt(2) === "9";
  var fixoOk = d.length === 10 && "2345".indexOf(d.charAt(2)) >= 0;

  if (!formatoOk || !dddOk || !(celularOk || fixoOk)) {
    return ["O telefone deve ter formato nacional válido, ex.: (81) 99999-9999."];
  }
  return [];
}

function aplicarMascara(input, formatador) {
  input.addEventListener("keypress", function (evento) {
    if (evento.key && evento.key.length === 1 && !/[0-9]/.test(evento.key)) {
      evento.preventDefault();
    }
  });
  input.addEventListener("input", function () {
    input.value = formatador(input.value);
  });
}

function mostrarMensagem(elemento, erros, mensagemSucesso) {
  elemento.innerHTML = "";
  if (erros.length === 0) {
    elemento.className = "mensagem sucesso";
    elemento.textContent = mensagemSucesso || "Validação realizada com sucesso";
    return;
  }
  elemento.className = "mensagem erro";
  var titulo = document.createElement("strong");
  titulo.textContent = erros.length === 1 ? "Corrija o campo abaixo:" : "Corrija os campos abaixo:";
  var lista = document.createElement("ul");
  erros.forEach(function (erro) {
    var item = document.createElement("li");
    item.textContent = erro;
    lista.appendChild(item);
  });
  elemento.appendChild(titulo);
  elemento.appendChild(lista);
}

function limparMensagem(elemento) {
  elemento.innerHTML = "";
  elemento.className = "mensagem";
}

function voltarParaPaginaAnterior(paginaPadrao) {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = paginaPadrao;
  }
}

var TEXTO_INSTRUCOES_SENHA =
  "Regras da senha: mínimo de 6 caracteres, com pelo menos 1 número, 1 letra maiúscula e 1 caractere especial. " +
  "Caracteres especiais permitidos: @ # $ % & * ! ? / \\ | - _ + . =   " +
  "Caracteres NÃO permitidos: ¨ { } [ ] ´ ` ~ ^ : ; < > , \u201C \u2018 (e também aspas simples e duplas comuns).";
