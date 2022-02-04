# ♾️ Criando rotinas de repetição

Pode ser que você queira criar uma rotina que se repita de tempos em tempos, para isso existe a
opção de criar comandos de loop. Para isto, basta criar um arquivo .js dentro do diretório `src/loops`
contendo a seguinte estrutura:

```js
module.exports = {
  interval: 10000,
  execute(){}
}
```

Onde:

- `interval`: é um valor numérico que representa o intervalo entre os loops, em milissegundos.
- `execute`: é a função que será executada.

## Exemplo

Imagine que você queira exibir a mensagem "Estou de olho em vocês 🐼" no chat de 5 em 5 segundos,
basta criar um arquivo em `src/loops/mensagem-do-panda.js` contendo:

```js

const { client } = require('../core/twitch_client');

module.exports = {
  interval: 5000,
  execute(){
    client.say(process.env.CHANNEL, 'Estou de olho em vocês 🐼');
  }
};
```

🎉 E pronto, sinta-se a vontade para sugerir ou contribuir com novas implementações.

----

## Links úteis

- [Criando novos comandos para o bot](./criando-novos-comandos.md)
- [Criando comandos de resposta automática](./criando-comandos-de-resposta-automatica.md)
- [Criando um pull request](https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
