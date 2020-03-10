const { getInput } = require('@actions/core');
const { ensureFile } = require('fs-extra');
const IsString = require('lodash.isstring');
const { appendFile } = require('mz/fs');
const { join } = require('path');
const { parse } = require('url');

const getNamedInput = (name, options) => {
  const value = getInput(name, options);
  return IsString(value) && value.length ? value : options.default;
};

module.exports = async () => {
  const scope = getNamedInput('scope');
  const token = getNamedInput('token');

  const registry = getNamedInput('registry', {
    required: false,
    default: 'https://registry.npmjs.org',
  });

  const cwd = getNamedInput('cwd', {
    required: false,
    default: process.cwd(),
  });

  const npmrc = join(cwd, '.npmrc');
  await ensureFile(npmrc);

  const _scope = scope ? `${scope}:` : '';
  await appendFile(npmrc, `\n${_scope}registry=${registry}\n`, 'utf-8');

  if (token) {
    const { host } = parse(registry);
    await appendFile(npmrc, `\n//${host}/:_authToken=${token}\n`, 'utf-8');
  }
};
