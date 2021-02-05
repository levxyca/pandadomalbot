# pandadomalbot

> O **pandadomalbot** foi pensado para as lives do canal da [levxyca](https://twitch.tv/levxyca). Foi criado para divertir e alegrar o chat da melhor live da galacta. Faz brincadeiras, ajuda a streamer e entretem seus queridos amigos.

## ☕ Usando pandadomalbot

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

## 📫 Contribuindo para pandadomalbot

Para contribuir com _pandadomalbot_, siga estas etapas:

1. Faça o fork desse repositório em sua conta do GitHub.
2. Clone o seu fork no seu ambiente e crie uma branch a partir da `main`.
3. Faça o commit das suas alterações e envie um novo pull request tendo a branch `test` como destino.
4. Envie para o branch original: `git push origin <nome_do_projeto> / <local>`

Caso tenha dificuldades, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).


## 😄 Seja um dos contribuidores<br>

Quer fazer parte desse projeto? Você pode nos ajudar criando issues novas, caso encontre erros ou também nos mandando sugestões de funcionalidades novas. Fique a vontade para verificar as issues já existentes e resolve-lás, basta comentar na issue que você irá fazer ela.

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE) para mais detalhes.

[⬆ Voltar ao topo](#pandadomalbot)<br>

---