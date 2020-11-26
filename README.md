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
2. [Social](#social)
3. [Contadores](#contadores)
4. [Brincadeiras](#brincadeiras)
5. [Doações e Inscrições](#doação)

## Geral

#### !comandos ou !commands

`!comandos` ou `!commands` trás um lista de todos os comandos ativos no canal.

## Social

Nesta categoria estão diversos comandos que direcionam para as redes da Levxyca:

#### !social

Retorna os links para todas as redes da streamer.

Lista dos comandos de cada rede social:

#### !telegram

#### !discord

#### !github

#### !fofinhos

Link para um grupo de WhatsApp onde se pode enviar imagens e vídeos de bichinhos fofinhos para alegrar seu dia.

## Contadores

Surgiu com uma brincadeira na live devido a *supostamente* a streamer dizer muitas vezes algumas palavras específicas. Os contadores mostram quantas vezes a streamer já disse aquela palavra naquele dia e quantas vezes no total de todas as streams.

#### !eita

Toda vez que a streamer diz *eita* você pode digitar `!eita` no chat para adicionar mais um eita no contator.

#### !calma

Toda vez que a streamer diz *calma* você pode digitar `!calma` no chat para adicionar mais um calma no contator.

#### !oh

Toda vez que a streamer diz *ó* você pode digitar `!oh` no chat para adicionar mais um ó no contator.

## Brincadeiras

### Perguntas sobre a vida

#### !pergunta

Faça uma pergunta para o panda sobre a vida o universo e tudo mais e ele lhe responderá com toda a sua magnifíca sabedoria e maldade.

Exemplo:

`!pergunta vai ter sorteio hoje?`

### Ban do amor

#### !ban

Esse é o *ban do amor*, você pode dar **!ban** em alguém da live que você gosta muito e tem uma porcentagem de chance de você tomar o *"ban"* ou a pessoal que você marcou levar essa pra casa. Esse *"ban"* é um timeout simbólico.

Digite o comando `!ban` com o nome da pessoa.

Exemplo:

`!ban levxyca` ou `!ban @levxyca`

### Sorveteria

Com os pontos do canal você consegue comprar sorvetes geladinhos para refrescar e adocicar sua vida.

#### !sorvete ou !picole

Olha o sorvete e o picole fresquinho a toda hooora. Por apenas a sua ALMA!!!

#### !sabores

`!sabores` para ver a lista dos sabores de sorvete disponíveis na nossa sorveteria.

#### !comprar

`!comprar` para comprar um sorvete fresquinho.

#### !geladeira

`!geladeira` para ver quais e quantos sorvetes você já comprou.

### Prisão do panda do mal

A prisão do panda do mal é uma brincadeira onde o panda prende alguém do chat aleatóriamente ou quando as pessoas tentam irritá-lo. Também temos uma ação extra que pode te recompensar com 1000 pontos, porém dizem que poucos conseguem 🐼 dar o `!carinho` perfeito.

#### !salvar

`!salvar` você pode usar esse comando quando alguém do chat foi pego para tentar salva-lo.

Cada vez que você salva alguém, você consegue obter pontos. Para ver seus pontos, bastar usar o `!pontos`.

#### !escapar

`!escapar` serve para quando você for pego pelo panda e quiser tentar fugir. Você tem apenas uma chance para obter sucesso!

Quando você obtem sucesso em escapar, você consegue ganhar uma quantidade de pontos aleatória.

#### !irritar

`!irritar` você pode, por sua livre e espontânea vontade tentar irritar o  panda, os riscos são por sua conta.

#### !carinho

`!carinho` você pode fazer carinho no panda e caso atinja o carinho PERFEITO, o panda pode te recompensar!

## Doação e Inscrições

### Formas de ajudar o canal financeiramente

#### !donate

**Link para fazer donate.**

As doações e incrições(subs) são uma forma de ajudar a melhorar a qualidade das streams. Caso queria doar, qualquer quantia é aceita e bem vinda! Você pode pode usar o `!donate` para ver as formas gerais de doar.

#### !prime

**Sub no canal via Amazon Prime.**

Você também tem a opção de usar o seu prime da Amazon para dar um sub no canal. Com o prime você paga 9,99R$ e você pode dar um sub aqui na live, assistir filmes, músicas, frete gratis e muito mais <3 Para saber mais, use o `!prime`.

#### !picpay

Link para doar através do PicPay.

#### !sub

Link para dar sub no canal.