# 🚀 Criando novos comandos

Para adicionar novos comandos ao bot, basta criar um novo arquivo `.js` dentro do diretório "commands".
Esse arquivo, precisa exportar o seguinte objeto:

```js
module.exports = {
  keyword: 'comando',
  aliases: [], // opcional
  execute: (args){}
};
```

Onde:

- `keyword`: como o nome sugere, é a palavra chave que será utilizada para _triggar_ o comando. Supondo que o comando a ser utilizado no chat seja "!abacaxi", o valor de `keyword` deve ser `abacaxi` somente.
- `aliases`: opcionalmente, um comando pode ter alguns _alias_, certo?! Por exemplo, dado que exista um comando "!abacaxi" que também pode ser _triggado_ através das palavras "piña" e "pineapple", você poderia criar um objeto no qual o `aliases` tenha valor: `['piña', 'pineapple']` (e quantas mais palavras quiser).
- `execute`: é a função que será executada quando o comando for recebido. Seu primeiro argumento é tudo que foi enviado na mensagem do chat, e, o restante dos argumentos são os mesmos enviados pelo evento de [chat][1] no tmi.js. Supondo que um comando "!abacaxi palavra1 palavra2" tenha sido _triggado_ no canal "levxyca", você teria algo assim na execução da função `execute`:

```js
module.exports = {
  keyword: 'abacaxi',
  execute: (args, channel, context, message){
    console.log(args); // palavra1 palavra2
    console.log(channel); // levxyca
    console.log(context); // {...}
    console.log(message); // !abacaxi palavra1 palavra2
  }
};
```

## ✨ Dicas

- Como mencionado anteriormente, tudo que estiver dentro do diretório "commands" será carregado e disponibilizado para o _bot_, de forma recursiva.

  - Isto quer dizer que você pode agrupar comandos "com o mesmo propósito" em um diretório específico, ao invés de criar um único arquivo que "faz tudo". Por exemplo, suponha que o _bot_ tenha a funcionalidade de SHOP no qual o telespectador pode comprar, vender, alugar, etc:

  ```none
  // RUIM 🥲
  pandadomalbot
    - src
      - commands
        - shop.js // TODA lógica de shop aqui dentro


  // MELHOR 😎
  pandadomalbot
    - src
      - commands
        - shop
          - comprar.js
          - vender.js
          - alugar.js
  ```

  - Arquivos iniciados com "\_" (_undescore_) serão ignorados quando o bot for carregado. Isto quer dizer que você pode usar esses arquivos para incluir funções auxiliares ou específicas de um grupo de comandos, por exemplo:

  ```none
  pandadomalbot
    - src
      - commands
        - calculadora
          - _operações.js  // Esse arquivo não será carregado como comando 😅
          - somar.js
          - subtrair.js
          - multiplicar.js
          - dividir.js
  ```

[1]: https://github.com/tmijs/docs/blob/gh-pages/_posts/v1.4.2/2019-03-03-Events.md#chat
