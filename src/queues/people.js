/* eslint-disable no-param-reassign */
const fastq = require('fastq');
const { read, write } = require('../utilities/data-file');

/** Nome do arquivo a ser utilizado. */
const FILE_NAME = 'people';

// Pattern utilizado para pegar valores c/ sinal, ex: "valor", "+valor", "-valor"
const ATTRIBUTE_UPDATE_REGEX = new RegExp('^(\\+|-)?(\\w*)');

function clearAttributes(attributes) {
  Object.keys(attributes).forEach((key) => {
    const match = ATTRIBUTE_UPDATE_REGEX.exec(attributes[key]);
    if (match) {
      const [, sign, value] = match;
      if (!Number.isNaN(value)) {
        attributes[key] = Number(value);
        if (attributes[key] === 1 && sign === '-') attributes[key] = 0;
      }
    }
  });
  return attributes;
}

function update(attributesToUpdate, newAttributes) {
  const target = { ...attributesToUpdate };

  Object.keys(target).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(newAttributes, key)) {
      const newValue = newAttributes[key];
      const match = ATTRIBUTE_UPDATE_REGEX.exec(newValue);
      if (match) {
        const [, sign, value] = match;
        switch (sign) {
          case '+':
            target[key] += Number(value);
            break;
          case '-':
            target[key] -= Number(value);
            if (target[key] < 0) {
              target[key] = 0;
            }
            break;
          default:
            target[key] = value;
        }
      }
      delete newAttributes[key];
    }
  });

  Object.assign(target, clearAttributes(newAttributes));
  return target;
}

async function worker({ username, attributes }) {
  const content = read(FILE_NAME, {});
  if (
    attributes &&
    Object.keys(attributes).length === 0 &&
    Object.getPrototypeOf(attributes) === Object.prototype
  ) {
    return content[username];
  }
  if (!Object.prototype.hasOwnProperty.call(content, username)) {
    content[username] = clearAttributes(attributes);
    console.info(
      `
        Novo usuário criado: ${username}.
        Atributos inicias: ${JSON.stringify(attributes)}.
        `,
    );
  } else {
    const oldAttributes = content[username];
    const newAttributes = update(oldAttributes, attributes);

    console.info(
      `
        Usuário ${username} atualizado.
        Antes: ${JSON.stringify(oldAttributes)}.
        Agora: ${JSON.stringify(newAttributes)}.
        `,
    );
    content[username] = newAttributes;
  }
  if (!write(FILE_NAME, content)) {
    console.error('Falha ao salvar o arquivo');
  }

  return content[username];
}

const queue = fastq.promise(worker, 1);

async function people(username, attributes = {}) {
  const person = await queue.push({
    username,
    attributes,
  });
  return person;
}

module.exports = { people };
