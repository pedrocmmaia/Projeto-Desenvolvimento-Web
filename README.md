# Inovatec

### Tecnologia sob medida para o crescimento do seu negócio.

Projeto acadêmico de um site para a **Inovatec**, uma empresa fictícia de serviços de tecnologia da informação. A experiência reúne apresentação institucional, cadastro e acesso de clientes e uma área demonstrativa para solicitação de serviços.

## Acesse o site

### [Abrir Inovatec no GitHub Pages →](https://pedrocmmaia.github.io/Projeto-Desenvolvimento-Web/)

O site abre na página institucional. Para conhecer a área de cliente, crie uma conta em **Cadastrar Cliente** e depois entre em **Login de Clientes**. Após o login, o link **Solicitar Serviços** fica disponível.

## Conheça o projeto

- **Página institucional:** história da empresa, vídeo, galeria de imagens, serviços, fundadores e informações de contato.
- **Cadastro de clientes:** formulário com validação de e-mail, senha, nome, CPF, data de nascimento e telefone.
- **Login:** acesso com e-mail e senha cadastrados.
- **Troca de senha:** alteração após informar a senha atual e validar a nova senha.
- **Solicitação de serviços:** consulta de solicitações demonstrativas e inclusão de novos serviços com preço e prazo calculados.

## Executar no computador

O projeto não precisa de instalação de dependências. Para executar localmente, abra um terminal na pasta do projeto e rode:

```bash
cd inovatec
python3 -m http.server 8000
```

Depois, acesse <http://localhost:8000/> no navegador. Para encerrar o servidor, volte ao terminal e pressione `Control+C`.

Use o endereço `http://localhost` em vez de abrir os arquivos diretamente (`file://`), pois o vídeo incorporado do YouTube precisa que a página seja servida por HTTP.

## Tecnologias

HTML, CSS e JavaScript, sem frameworks. O site usa o armazenamento local do navegador para demonstrar cadastro e sessão. Por isso, as contas ficam no navegador em que foram criadas; não existe banco de dados ou servidor de autenticação. As solicitações de exemplo e as alterações feitas na tabela são demonstrativas e voltam ao estado inicial ao recarregar a página.

O vídeo, as imagens externas e a fonte Poppins dependem de conexão com a internet.

## Equipe

**Pedro Maia** e **Gabriel Abreu**

Sistemas de Informação — CESAR School
