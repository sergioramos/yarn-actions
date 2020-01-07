const { getInput, setOutput } = require('@actions/core');
const Execa = require('execa');
const ForceArray = require('force-array');
const IsString = require('lodash.isstring');
const IsUndefined = require('lodash.isundefined');
const Unparse = require('yargs-unparser');

const handleNamedInput = (args = [], { name, ...input }) => {
  const { dflt, required = false, flag = false, split = false } = input;

  const strValue = getInput(name, { required, default: dflt });
  const isString = IsString(strValue) && strValue.length;
  const parsedVal = flag && isString ? JSON.parse(strValue) : strValue;
  const value =
    !split || !isString
      ? parsedVal
      : parsedVal
          .split(/,/gi)
          .map(str => str.trim())
          .filter(Boolean);

  return (flag && !value) || (!flag && !isString)
    ? args
    : args.concat(Unparse({ [name]: value }));
};

const handleAnonymousInput = (args = [], input) => {
  const { name, dflt, required = false } = input;
  const value = getInput(name, { required, default: dflt });
  return IsUndefined(value) ? args : args.concat(ForceArray(value));
};

module.exports = async ({ name, inputs }) => {
  const localArgs = ForceArray(
    Object.values(inputs)
      .filter(({ global }) => !global)
      .filter(({ anonymous }) => !anonymous)
      .reduce(handleNamedInput, []),
  );

  const localAnonymous = ForceArray(
    Object.values(inputs)
      .filter(({ global }) => !global)
      .filter(({ anonymous }) => anonymous)
      .reduce(handleAnonymousInput, []),
  );

  const globalArgs = ForceArray(
    Object.values(inputs)
      .filter(({ global }) => global)
      .filter(({ anonymous }) => !anonymous)
      .reduce(handleNamedInput, []),
  );

  const globalAnonymous = ForceArray(
    Object.values(inputs)
      .filter(({ global }) => global)
      .filter(({ anonymous }) => anonymous)
      .reduce(handleAnonymousInput, []),
  );

  const command = globalAnonymous
    .concat(globalArgs)
    .concat(ForceArray(name))
    .concat(localAnonymous)
    .concat(localArgs);

  console.log('yarn', ...command);
  const { exitCode, stdout, stderr } = await Execa('yarn', command, {
    stdio: 'inherit',
  });

  setOutput('stdout', stdout);
  setOutput('stderr', stderr);

  return exitCode;
};
