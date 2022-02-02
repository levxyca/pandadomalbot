# ♾️ Criando comandos de resposta automática

Alguns padrões de mensagem podem ser configurados para serem respondidos automaticamente pelo bot.
Existe uma funcionalidade de _autoreply_ que pode ser facilmente implementada para qualquer tipo de mensagem,
para isto, basta criar um arquivo `.js` dentro do diretório `src/autoreply` contendo a seguinte estrutura:

```js
module.exports = {
  patterns: [],
  execute({channel, context, message, matches}){}
}
```

Onde:

- `patterns`: uma lista de [expressões regulares][1] utilizadas para dar "_match_"
com o conteúdo da mensagem.
- `execute`: é a função que será executada quando ocorrer o match com uma das expressões
regulares definidas. Um foco maior no argumento `matches` que, irá retornar o conteúdo do
_match_, caso queira utilizá-lo. **PS**: A função `execute` **deve** retornar uma string que,
será enviada no chat automaticamente pelo bot.

## Exemplo

Imagine um caso no qual você gostaria que o bot respondesse "boa tarde" de forma automática
quando um usuário enviar essa mensagem no chat. Para isto, pode-se criar um novo arquivo, por exemplo,
em `src/autoreply/boa-tarde.js` contendo:

```js
module.exports = {
  patterns: [/^boa tarde$/],
  execute({ context }) {
    return `Boa tarde para você também, ${context.username}!`;
  },
};
```

Nesse exemplo, sempre que "boa tarde" fosse enviado no chat, o bot iria responder automaticamente com
"Boa tarde para você também, @!", onde @ é a menção ao usuário que utilizou o comando.

E em casos onde a pessoa mande "Bommmm dia", "Bom diaaaaaaaa", etc? É aí que entra a possibilidade
de utilizar vários _patterns_, e/ou, criar um único padrão mais abrangente, por exemplo:

```js
module.exports = {
  patterns: [/^[Bb][Oo]+[Aa]+\s+[Tt][Aa]+[Rr][Dd][Ee]+$/],
  execute({ context }) {
    return `Boa tarde para você também, ${context.username}!`;
  },
};
```

🎉 E pronto, sinta-se a vontade para sugerir ou contribuir com novas implementações.

----

## Links úteis

- [Criando novos comandos para o bot](./criando-novos-comandos.md)
- [Criando um pull request](https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
- [GitHub para leigos](https://dev.to/levxyca/pt-br-github-para-leigos-4i7j)

[1]: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions
