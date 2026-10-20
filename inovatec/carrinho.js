var SERVICOS = [
  { nome: "Suporte técnico remoto", preco: 250, prazo: 2 },
  { nome: "Backup e recuperação de dados", preco: 900, prazo: 5 },
  { nome: "Consultoria em TI", preco: 1800, prazo: 7 },
  { nome: "Auditoria de segurança da informação", preco: 3200, prazo: 10 },
  { nome: "Migração para a nuvem", preco: 4800, prazo: 15 },
  { nome: "Desenvolvimento de sistema sob medida", preco: 12000, prazo: 45 }
];

var solicitacoes = [
  { numero: 1001, dataPedido: "2026-08-05", servico: "Suporte técnico remoto", status: "CONCLUÍDO", preco: 250, dataPrevista: "2026-08-07" },
  { numero: 1002, dataPedido: "2026-08-20", servico: "Consultoria em TI", status: "CONCLUÍDO", preco: 1800, dataPrevista: "2026-08-27" },
  { numero: 1003, dataPedido: "2026-09-18", servico: "Migração para a nuvem", status: "EM ANDAMENTO", preco: 4800, dataPrevista: "2026-10-03" }
];

var proximoNumero = 1004;

var selectServico = document.getElementById("servico");
var rotuloPreco = document.getElementById("rotulo-preco");
var rotuloPrazo = document.getElementById("rotulo-prazo");
var rotuloDataPrevista = document.getElementById("rotulo-data-prevista");
var rotuloStatus = document.getElementById("rotulo-status");
var botaoIncluir = document.getElementById("botao-incluir");
var corpoSolicitacoes = document.getElementById("corpo-solicitacoes");
var avisoVazio = document.getElementById("aviso-vazio");
var mensagem = document.getElementById("mensagem");

function mostrarUsuarioLogado() {
  var email = localStorage.getItem("inovatec_login") || "";
  var usuario = buscarUsuarioPorEmail(email);

  document.getElementById("usuario-nome").textContent = usuario ? (usuario.nome || usuario.email) : "";
  document.getElementById("usuario-login").textContent = usuario ? usuario.email : "";
}

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function paraISO(data) {
  var mes = String(data.getMonth() + 1).padStart(2, "0");
  var dia = String(data.getDate()).padStart(2, "0");
  return data.getFullYear() + "-" + mes + "-" + dia;
}

function formatarDataISO(iso) {
  var p = iso.split("-");
  return p[2] + "/" + p[1] + "/" + p[0];
}

function somarDias(data, dias) {
  var nova = new Date(data.getFullYear(), data.getMonth(), data.getDate());
  nova.setDate(nova.getDate() + dias);
  return nova;
}

function servicoSelecionado() {
  return SERVICOS[selectServico.value] || null;
}

function atualizarRotulosDoServico() {
  var servico = servicoSelecionado();
  if (!servico) {
    rotuloPreco.textContent = "-";
    rotuloPrazo.textContent = "-";
    rotuloDataPrevista.textContent = "-";
    return;
  }
  rotuloPreco.textContent = formatarPreco(servico.preco);
  rotuloPrazo.textContent = servico.prazo + (servico.prazo === 1 ? " dia" : " dias");
  rotuloDataPrevista.textContent = formatarDataISO(paraISO(somarDias(new Date(), servico.prazo)));
}

function criarCelula(texto) {
  var td = document.createElement("td");
  td.textContent = texto;
  return td;
}

function renderizarSolicitacoes() {
  solicitacoes.sort(function (a, b) {
    if (a.dataPedido !== b.dataPedido) {
      return a.dataPedido < b.dataPedido ? -1 : 1;
    }
    return a.numero - b.numero;
  });

  corpoSolicitacoes.innerHTML = "";

  solicitacoes.forEach(function (s) {
    var linha = document.createElement("tr");
    linha.appendChild(criarCelula(formatarDataISO(s.dataPedido)));
    linha.appendChild(criarCelula(s.numero));
    linha.appendChild(criarCelula(s.servico));
    linha.appendChild(criarCelula(s.status));
    linha.appendChild(criarCelula(formatarPreco(s.preco)));
    linha.appendChild(criarCelula(formatarDataISO(s.dataPrevista)));

    var celulaAcao = document.createElement("td");
    var botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.className = "botao botao-excluir";
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.addEventListener("click", function () {
      excluirSolicitacao(s.numero);
    });
    celulaAcao.appendChild(botaoExcluir);
    linha.appendChild(celulaAcao);

    corpoSolicitacoes.appendChild(linha);
  });

  avisoVazio.hidden = solicitacoes.length > 0;
}

function excluirSolicitacao(numero) {
  solicitacoes = solicitacoes.filter(function (s) {
    return s.numero !== numero;
  });
  renderizarSolicitacoes();
}

function incluirSolicitacao() {
  var servico = servicoSelecionado();
  if (!servico) {
    mostrarMensagem(mensagem, ["Selecione um serviço de TI para incluir a solicitação."]);
    return;
  }

  var hoje = new Date();
  solicitacoes.push({
    numero: proximoNumero++,
    dataPedido: paraISO(hoje),
    servico: servico.nome,
    status: rotuloStatus.textContent,
    preco: servico.preco,
    dataPrevista: paraISO(somarDias(hoje, servico.prazo))
  });

  renderizarSolicitacoes();
  mostrarMensagem(mensagem, [], "Solicitação incluída com sucesso.");
  selectServico.value = "";
  atualizarRotulosDoServico();
}

SERVICOS.forEach(function (servico, indice) {
  var opcao = document.createElement("option");
  opcao.value = indice;
  opcao.textContent = servico.nome;
  selectServico.appendChild(opcao);
});

selectServico.addEventListener("change", function () {
  limparMensagem(mensagem);
  atualizarRotulosDoServico();
});
botaoIncluir.addEventListener("click", incluirSolicitacao);

renderizarSolicitacoes();
atualizarRotulosDoServico();
mostrarUsuarioLogado();
