<template>
  
  <h1>Executando o bot localmente</h1>
  <p>
    Para executar este projeto, você precisa do
    <a href="https://nodejs.org/en/download/">NodeJS</a> instalado e um token de
    acesso para uma conta existente na Twitch. Pode-se utilizar usa própria
    conta para testes, mas o ideal é ter uma exclusiva para o bot.
  </p>

  <p>
    Para obter o token, entre
    <a href="https://twitchapps.com/tmi/">neste serviço</a> e autorize-o a ter
    acesso a sua conta da Twitch. Guarde o token obtido em um local seguro. Com
    o token em mãos: instale as dependências, defina as variáveis de ambiente
    (você pode criar um arquivo <code>.env</code> na raiz do projeto com as
    variáveis presentes no arquivo <a href="https://github.com/levxyca/pandadomalbot/blob/main/.env.example">.env.example</a>) e
    execute a aplicação:
  </p>

  <pre>
npm install

BOT_USERNAME=pandadomal         # nome de usuário da sua conta.
CHANNEL_NAME=levxyca            # canal que irá escutar pelos comandos.
OAUTH_TOKEN=                    # token de acesso obtido anteriormente.

npm run start

    Bot is running at irc-ws.chat.twitch.tv:80
  </pre>

</template>

<script>
export default {
  name: 'Desenvolvimento',
}
</script>
