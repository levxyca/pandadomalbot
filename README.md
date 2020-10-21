# Panda do Mal Bot

O Panda do Mal Bot foi pensado para as lives do canal da [Levxyca](https://twitch.tv/levxyca).

# Desenvolvimento

## Executando o bot localmente

Para executar este projeto, você precisa do [NodeJS](https://nodejs.org/en/download/) instalado e um token de acesso para uma conta existente na Twitch. Pode-se utilizar usa própria conta para testes, mas o ideal é ter uma exclusiva para o bot.

Para obter o token, entre [neste serviço](https://twitchapps.com/tmi/) e autorize-o a ter acesso a sua conta da Twitch. Guarde o token obtido em um local seguro. Com o token em mãos: instale as dependências, defina as variáveis de ambiente (você pode criar um arquivo `.env` na raiz do projeto com as variáveis presentes no arquivo [.env.example](.env.example)) e execute a aplicação:

```
npm install

BOT_USERNAME=pandadomal         # nome de usuário da sua conta.
CHANNEL_NAME=levxyca            # canal que irá escutar pelos comandos.
OAUTH_TOKEN=                    # token de acesso obtido anteriormente.

npm run start

    Bot is running at irc-ws.chat.twitch.tv:80
```

## Contribuindo

- Faça o fork desse repositório em sua conta do GitHub.
- Clone o seu fork no seu ambiente e crie uma branch a partir da `main`.
- Faça o commit das suas alterações e envie um novo pull request tendo a branch `test` como destino.

# Comandos

As categorias de comandos do bot são as seguintes:

1. [Geral](#geral)
2. [Donate e Sub](#donate)
3. [Social](#social)

## Geral

### !ban

Digite o comando `!ban` com o nome da pessoa.

Exemplo:

`!ban levxyca`

ou

`!ban @levxyca`

### !comandos

Lista todos os comandos já existentes.

### !pergunta

Faça uma pergunta para a vida o universo e tudo mais.

Exemplo:

`!pergunta vai ter sorteio hoje?`

## Donate e Sub

### !donate

Link para fazer donate pela twitch.

### !prime

Link para dar um sub no canal via Amazon Prime.

### !picpay

Link para doar através do PicPay.

### !sub

Link para dar sub no canal.

## Social

Nesta categoria estão diversos comandos que direcionam para as redes da Levxyca:

### !social

Retorna os links para todas as redes da streamer.

### !telegram

### !discord

### !fofinhos

Link para um grupo de WhatsApp onde se pode enviar imagens e vídeos de bichinhos fofinhos para alegrar seu dia.

### !github
