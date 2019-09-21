const { getInput, setOutput } = require('@actions/core');
const Main = require('apr-main');
const Execa = require('execa');
const ForceArray = require('force-array');
const IsString = require('lodash.isstring');
const IsUndefined = require('lodash.isundefined');
const Unparse = require('yargs-unparser');

const { name, inputs } = require('./manifest.json');

Main(async () => {
  const args = ForceArray(
    Object.values(inputs)
      .filter(({ anonymous }) => !anonymous)
      .reduce((args = [], { boolean, required, name, ...input }) => {
        const strValue = getInput(name, { required, default: input.default });
        const isString = IsString(strValue) && strValue.length;
        const value = boolean && isString ? JSON.parse(strValue) : strValue;

        return (boolean && !value) || (!boolean && !isString)
          ? args
          : args.concat(Unparse({ [name]: value }));
      }, []),
  );

  const anonymous = ForceArray(
    Object.values(inputs)
      .filter(({ anonymous }) => anonymous)
      .reduce((args, { required, name, ...input }) => {
        const value = getInput(name, { required, default: input.default });
        return IsUndefined(value) ? args : args.concat(ForceArray(value));
      }, []),
  );

  console.log('yarn', ...args.concat(anonymous).concat(name));
  const { exitCode, stdout, stderr } = await Execa(
    'yarn',
    args.concat(anonymous).concat(name),
    {
      stdio: 'inherit',
    },
  );

  setOutput('stdout', stdout);
  setOutput('stderr', stderr);

  process.exit(exitCode);
});
