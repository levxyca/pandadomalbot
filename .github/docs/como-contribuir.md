# 🐼 Contribuindo com o pandadomalbot

1. [Como contribuir](#como-contribuir)
2. [Antes de executar](#antes-de-executar)
3. [Executando](#executando)

## Como contribuir

Para contribuir com este projeto, você não precisa necessariamente programar. Reportar problemas e sugerir
melhorias também são ótimas formas de contribuir. Para isto, basta criar uma [nova _issue_][6], bem descritiva.

Mas caso queira contribuir com código, você precisa ter o [git][1] e o [NodeJS][2] devidamente
instalados.

> Caso você tenha dificuldades ou não saiba usar o GitHub, recomendo que leia esse artigo da levxyca
> falando sobre [GitHub para leigos][7].

Uma vez que ambos estiverem prontos, basta clonar este repositório:

```sh
git clone git@github.com:levxyca/pandadomalbot.git
```

E instalar as dependências:

```sh
cd ./pandadomalbot
npm i
```

## Antes de executar

Antes de executar a aplicação, é necessário configurar algumas [variáveis de ambiente][3].
Já deixamos um arquivo na raiz do projeto, chamado [`.env.example`][4] para tornar mais fácil
de visualizar quais são essas variáveis.

Dependendo da _feature_ que você irá trabalhar, talvez não seja necessário especificar todas as variáveis.
Na maioria dos casos, somente o canal no qual o bot irá atuar e o token de acesso (OAuth) da Twitch
são suficientes.

### Obtendo token

Para obter o token, você precisa ter uma conta na Twitch.
Você pode utilizar a conta do seu canal mesmo, caso não tenha uma conta específica para bots.

- Faça login na sua conta da Twitch
- Em seguida, acesse [este serviço][5] e autorize o acesso à sua conta da Twitch
- Depois de autorizado, guarde o token exibido.

## Executando

Você pode definir todas as variáveis de ambiente especificadas no arquivo [.env.example][4],
mas para não ter tanto trabalho, basta renomear o arquivo para `.env`, assim a própria aplicação
se encarregará de carregar todas as variáveis definidas nesse arquivo. Depois de renomeá-lo,
edite as variáveis:

- `USERNAME`: nome de usuário da conta da Twitch que será utilizado pelo bot;
- `PASSWORD`: é o token de acesso que foi obtido anteriormente, caso não lembre, acesse novamente
[este serviço][5];
- `CHANNEL`: nome do canal onde o bot ficará ativo.

Você pode usar o nome do seu canal em `USERNAME` e `CHANNEL`, para testes.

Depois disso, basta executar o seguinte comando:

```sh

npm start


> pandadomalbot@1.0.0 start
> node src/index.js

info: Connecting to irc-ws.chat.twitch.tv on port 443..
info: Sending authentication to server..
info: Connected to server.
info: Executing command: JOIN :levxyca
info: Joined :levxyca

```

🎉 E pronto, basta dar comandos para o bot! Um bom ponto de partida é executar o comando `!commands`.

----

### Links úteis

- [Criando novos comandos para o bot](./criando-novos-comandos.md)
- [Criando comandos de resposta automática](./criando-comandos-de-resposta-automatica.md)
- [Criando rotinas de repetição](./criando-rotinas-de-repeticao.md)
- [Criando um pull request](https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

[1]: https://git-scm.com/downloads
[2]: https://nodejs.org/en/download/
[3]: https://pt.wikipedia.org/wiki/Vari%C3%A1vel_de_ambiente
[4]: ../../.env.example
[5]: https://twitchapps.com/tmi/
[6]: https://github.com/levxyca/pandadomalbot/issues
[7]: https://dev.to/levxyca/pt-br-github-para-leigos-4i7j
