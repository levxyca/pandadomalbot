# pandadomalbot 🐼 [![Continuous Integration](https://github.com/levxyca/pandadomalbot/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/levxyca/pandadomalbot/actions/workflows/ci.yml)

> O **pandadomalbot** foi pensado para as lives do canal da [levxyca](https://twitch.tv/levxyca). Criado para divertir e alegrar o chat da melhor live da galacta. Faz brincadeiras, ajuda a streamer e entretêm. Para ver todas as funcionalidades do bot leia sua documentação [aqui](https://levxyca.codes/pandadomalsite/).

## Usando pandadomalbot

Para executar este projeto, você precisa do [NodeJS](https://nodejs.org/en/download/) instalado e um token de acesso para uma conta existente na Twitch. Pode-se utilizar usa própria conta para testes, mas o ideal é ter uma exclusiva para o bot.

Para obter o token, entre [neste serviço](https://twitchapps.com/tmi/) e autorize-o a ter acesso a sua conta da Twitch. Guarde o token obtido em um local seguro. Com o token em mãos: instale as dependências, defina as variáveis de ambiente (você pode criar um arquivo `.env` na raiz do projeto com as variáveis presentes no arquivo [.env.example](.env.example)) e execute a aplicação:

```
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

## Seja um dos contribuidores<br>

Quer fazer parte desse projeto? Você pode nos ajudar criando issues novas, caso encontre erros ou também nos mandando sugestões de funcionalidades novas. Fique a vontade para verificar as issues já existentes e resolve-lás.

Para contribuir com _pandadomalbot_ leia nosso [CONTRIBUTING](.github/CONTRIBUTING.md).

## Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE) para mais detalhes.
