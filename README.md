# Projeto-Desenvolvimento-Web - INOVATEC

Solução de 5 páginas para a empresa fictícia **Inovatec**, que vende serviços de TI. Projeto desenvolvido em HTML, CSS e JavaScript puros (sem frameworks), seguindo a especificação da AV1.

## Como executar

1. Extraia a pasta do projeto, mantendo todos os arquivos juntos.
2. Abra um terminal dentro da pasta `inovatec` e execute `python3 -m http.server 8000`.
3. Acesse `http://localhost:8000/institucional.html` no navegador. Use um servidor HTTP local em vez de abrir o HTML diretamente (`file://`), pois o player incorporado do YouTube precisa receber a identificação de origem da página.

## Publicar no GitHub Pages

O fluxo `.github/workflows/pages.yml` publica automaticamente o conteúdo de `inovatec/` quando há um push na branch `main`. Ele também usa a página institucional como entrada (`index.html`). Para ativar a publicação, abra **Settings → Pages** no repositório do GitHub e selecione **GitHub Actions** como fonte de build e deploy. Depois de enviar as alterações para `main`, acompanhe a execução em **Actions** e copie o endereço publicado em **Settings → Pages**. A publicação pode levar alguns minutos.

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
| Vídeo do YouTube | Vídeo institucional incorporado na página por `iframe`. |

## Fluxo de navegação

```
institucional ──► login ──► (sucesso) ──► institucional (link "Solicitar Serviços" liberado) ──► carrinho
      │             ├──► troca-senha ──► (sucesso) ──► página anterior
      └──► cadastro ◄┘
```

O cadastro e o estado de login são guardados em `localStorage` (`inovatec_usuarios`, `inovatec_logado` e `inovatec_login`). O login só aceita e-mail cadastrado e a senha correspondente. Como o projeto não tem servidor, essa autenticação é apenas uma simulação local para fins acadêmicos; os dados ficam no navegador usado para cadastrar a conta.

## Páginas e validações

### Institucional
- **Header:** logo, frase de apresentação e três links (login, cadastro e solicitação de serviços, este só após login).
- **Corpo:** história da empresa em área com rolagem automática, vídeo institucional, galeria com 4 fotos de tamanho uniforme, apresentação dos serviços e tabela de fundadores.
- **Footer:** contatos em lista (telefone fixo, WhatsApp e `mailto`), endereço e formas de pagamento. O rodapé usa tabela para organizar o layout.

### Login
- Login obrigatório e com formato de e-mail válido; senha obrigatória.
- "Realizar Login" valida o e-mail e a senha contra uma conta cadastrada; em caso de sucesso, mostra uma mensagem e vai para a página institucional.
- "Limpar" apaga os campos e foca o login.

### Troca de senha
- Login (e-mail), senha atual, nova senha e confirmação são obrigatórios; a nova senha deve ser diferente da atual.
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
- "Incluir" valida os campos, rejeita e-mails já cadastrados e salva a nova conta no navegador; "Limpar" restaura os valores padrão e foca o e-mail, "Voltar" retorna à página anterior.

### Carrinho (solicitação de serviços de TI)
- A página confere a sessão e o cadastro antes de carregar o conteúdo; acesso direto sem login redireciona para a tela de login.
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

## Requisitos visuais e conteúdo

- A página institucional incorpora o vídeo publicado no YouTube por meio de um `iframe`.
- A tabela da página institucional apresenta cargo, nome e breve currículo dos dois fundadores da Inovatec.

## Autores

Pedro Maia e Gabriel Abreu – Sistemas de Informação, CESAR School.
