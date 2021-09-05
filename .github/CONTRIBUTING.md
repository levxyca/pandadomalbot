# Contribuindo

Ao contribuir com este repositório, discuta primeiro a mudança que deseja fazer por meio da issue.

Para que você entenda todas as funcionalidades existentes no nosso bot recomenda-se a leitura [dessa documentação](https://levxyca.codes/pandadomalsite/). Caso tenha alguma dúvida mande um comentário na issue.

## Como Contribuir

Para contribuir com projeto _pandadomalbot_, siga estas etapas:

1. Faça o fork desse repositório em sua conta do GitHub.
2. Clone o seu fork no seu ambiente e crie uma branch a partir da `main`.
3. Faça o commit das suas alterações e envie um novo pull request tendo a branch `main` como destino.
4. Envie para o branch original: `git push origin <nome_do_projeto> / <local>`

Caso tenha dificuldades, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## Configurações Importantes

Para executar este projeto, você precisa do [NodeJS](https://nodejs.org/en/download/) instalado e um token de acesso para uma conta existente na Twitch. Pode-se utilizar usa própria conta para testes, mas o ideal é ter uma exclusiva para o bot.

Para obter o token, entre [neste serviço](https://twitchapps.com/tmi/) e autorize-o a ter acesso a sua conta da Twitch. Guarde o token obtido em um local seguro. Com o token em mãos: instale as dependências, defina as variáveis de ambiente (você pode criar um arquivo `.env` na raiz do projeto com as variáveis presentes no arquivo [.env.example](.env.example)) e execute a aplicação:

```sh
npm install

BOT_USERNAME=pandadomal # nome de usuário da sua conta.
OAUTH_TOKEN=            # token de acesso obtido anteriormente.
CHANNEL_NAME=levxyca    # canal que irá escutar pelos comandos.

CLIENT_ID=clienteIDdeumaappdatwitch
CHANNEL_ID=IDdocanalqueobotvairodar

##### Configurações das brincadeiras da live #####

MAXIMO_DE_IRRITAR_DIARIOS=     #limita a quantidade de !irritar que o usuário pode usar por dia.
SUCCESSFULLY_IRRITATE_POINTS=    #pontos que o usuário ganhar por conseguir irritar o pandadomalbot.

MAXIMO_DE_CARINHOS_DIARIOS=    #quantidade padrão de carinhos que o usuário tem por dia.
PONTOS_POR_CARINHO_PERFEITO=    #pontos que o usuário ganha ao conseguir um carinho perfeito.

MINUTOS_ENTRE_PRISAO_DE_VIEWERS=    #minutos entre o pandadomalbot "prender" alguém do chat.

##### Configurações do twitter #####

TWITTER_USERNAME=
TWITTER_API_KEY=
TWITTER_API_SECRET=
TWITTER_ACCESS_TOKEN=
TWITTER_ACCESS_TOKEN_SECRET=

##### Filtros para obter o tweet diário de anúncio da live #####

#   RETWEET_URL_LOOKUP: a url que deve estar presente.
#   RETWEET_TEXT_LOOKUP: texto que deve existir no tweet (em lowercase).
RETWEET_URL_LOOKUP=twitch.tv/levxyca
RETWEET_TEXT_LOOKUP=live on

MINUTOS_ENTRE_PEDIDO_DE_RETWEET=10

##### Comando para rodar o bot #####

npm run start

    Bot is running at irc-ws.chat.twitch.tv:80
```
