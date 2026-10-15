# Projeto-Desenvolvimento-Web - INOVATEC

Solução de 5 páginas para a empresa fictícia **Inovatec**, que vende serviços de TI. Projeto desenvolvido em HTML, CSS e JavaScript puros (sem frameworks), seguindo a especificação da AV1.

## Como executar

1. Extraia a pasta do projeto, mantendo todos os arquivos juntos.
2. Abra `institucional.html` no navegador.

Não há instalação nem dependências. As fotos da galeria (Unsplash) e a fonte Poppins (Google Fonts) são carregadas pela internet.

## Estrutura de arquivos

| Arquivo | Descrição |
|---|---|
| `institucional.html` / `institucional.js` | Página de apresentação da empresa. O JS exibe o link "Solicitar Serviços" apenas se houver login. |
| `login.html` / `login.js` | Login de clientes. |
| `troca-senha.html` / `troca-senha.js` | Troca de senha de clientes. |
| `cadastro.html` / `cadastro.js` | Cadastro de clientes. |
| `carrinho.html` / `carrinho.js` | Solicitação de serviços de TI. |
| `validacoes.js` | Funções de validação e utilitários compartilhados entre as páginas. |
| `styles.css` | Folha de estilos única, usada por todas as páginas. |
| `logo-inovatec.svg`, `pagamento-*.svg` | Logo e ícones das formas de pagamento. |
| `galeria-4.jpg` | Quarta foto da galeria. |
| `video-institucional.mp4` | Vídeo institucional. |

## Fluxo de navegação

```
institucional ──► login ──► (sucesso) ──► institucional (link "Solicitar Serviços" liberado) ──► carrinho
      │             ├──► troca-senha ──► (sucesso) ──► página anterior
      └──► cadastro ◄┘
```

O estado de login é guardado em `localStorage` (`inovatec_logado` e `inovatec_login`). Ainda não há autenticação real: qualquer e-mail válido com senha preenchida realiza o login.

## Páginas e validações

### Institucional
- **Header:** logo, frase de apresentação e três links (login, cadastro e solicitação de serviços, este só após login).
- **Corpo:** história da empresa em área com rolagem automática, vídeo institucional, galeria com 4 fotos de tamanho uniforme, apresentação dos serviços e tabela de fundadores.
- **Footer:** contatos em lista (telefone fixo, WhatsApp e `mailto`), endereço e formas de pagamento. O rodapé usa tabela para organizar o layout.

### Login
- Login obrigatório e com formato de e-mail válido; senha obrigatória.
- "Realizar Login" valida e, se estiver tudo certo, mostra "Validação realizada com sucesso" e vai para a página institucional.
- "Limpar" apaga os campos e foca o login.

### Troca de senha
- Login (e-mail), senha e confirmação são obrigatórios.
- A senha precisa ter no mínimo 6 caracteres, com pelo menos 1 número, 1 letra maiúscula e 1 caractere especial permitido: `@ # $ % & * ! ? / \ | - _ + . =`
- Caracteres não permitidos: `¨ { } [ ] ´ ` ~ ^ : ; < > , “ ‘` (aspas simples e duplas comuns também são bloqueadas).
- As regras aparecem em um campo de saída (`<output>`) na própria página.
- Em caso de sucesso, volta para a página anterior.

### Cadastro
- Mesmas validações de e-mail, senha e confirmação da troca de senha.
- **Nome:** obrigatório, com ao menos duas palavras, primeira com 2 ou mais caracteres e sem caracteres especiais.
- **CPF:** máscara `NNN.NNN.NNN-NN`, digitação restrita a dígitos e validação dos dígitos verificadores.
- **Data de nascimento:** obrigatória, e o cliente precisa ter 18 anos ou mais.
- **Telefone (opcional):** máscara automática e validação de formato nacional, ex.: `(81) 99999-9999`.
- **Estado civil** (padrão: solteiro(a)) e **escolaridade** (padrão: 2º grau completo).
- "Incluir" valida, "Limpar" restaura os valores padrão e foca o e-mail, "Voltar" retorna à página anterior.

### Carrinho (solicitação de serviços de TI)
- **Usuário:** nome e e-mail em valores fixos (esta versão ainda não lê o login).
- **Minhas solicitações:** tabela em ordem crescente de data do pedido, com dados fictícios iniciais e botão de excluir em cada linha.
- **Nova solicitação:** combo de serviços; preço, prazo e data prevista (hoje + prazo) são calculados ao selecionar; status inicial "EM ELABORAÇÃO"; o botão "Incluir solicitação" adiciona a linha na tabela.
- Os dados ficam apenas em memória e voltam ao padrão ao recarregar a página.

## Requisitos técnicos atendidos

**HTML:** sem tags de estilização obsoletas, blocos semânticos (`header`, `nav`, `main`, `section`, `footer`), destaque de texto (`strong`, `blockquote`), tabelas, listas, imagens, figuras e links, e tabela usada para organizar o rodapé.

**CSS:**
- Todos os tipos de seletor: universal, tipo, classe, id, atributo, descendente, filho (`>`), irmão adjacente (`+`) e geral (`~`), pseudo-classe e pseudo-elemento.
- Acumulação e sobrescrita de estilos, em arquivo externo, em `<style>` e em estilo inline usado com moderação.
- Fontes diferentes para cabeçalhos (Poppins) e parágrafos (Arial).
- Alinhamento com Flexbox e CSS Grid.
- Rolagem automática no texto longo da história.
- Layout responsivo com `@media`.

**JavaScript:** validações, máscaras, manipulação do DOM e `localStorage`.

## Pendências antes da entrega

- Preencher o nome e o CV do **terceiro fundador** na tabela da página institucional (o PDF exige 3).
- O PDF pede o vídeo em **streaming no YouTube**. O projeto usa atualmente o arquivo `video-institucional.mp4`; para atender ao requisito, hospede o vídeo no YouTube e substitua a tag `<video>` por um `<iframe>` de incorporação.

## Autores

Pedro Maia e Gabriel Abreu – Sistemas de Informação, CESAR School.
