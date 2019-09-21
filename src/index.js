const { writeFile, readFile } = require('mz/fs');
const { series: ForEach } = require('apr-for-each');
const Main = require('apr-main');
const Del = require('del');
const Execa = require('execa');
const Mkdir = require('make-dir');
const { write } = require('node-yaml');
const { join } = require('path');

const { author } = require('../package.json');
const { commands, inputs: globalInputs } = require('./manifest.json');
const { parse, stringify } = JSON;

const parseInputs = (inputs = {}) => {
  return Object.keys(inputs).reduce((sum = {}, name) => {
    const { description, required, ...input } = inputs[name];
    return Object.assign({}, sum, {
      [name]: parse(
        stringify({
          description,
          required,
          default: input.default,
        }),
      ),
    });
  }, {});
};

const handleCommand = async cmd => {
  const { name, description, inputs: cmdInputs, cwd } = cmd;
  const allInputs = Object.assign({}, globalInputs || {}, cmdInputs || {});

  const inputs = Object.keys(allInputs).reduce((inputs = {}, name) => {
    return Object.assign(inputs, {
      [name]: Object.assign(allInputs[name], { name }),
    });
  }, {});

  await Del(cwd);
  await Mkdir(cwd);

  await writeFile(
    join(cwd, 'manifest.json'),
    stringify({ name, inputs }, null, 2),
  );

  await writeFile(
    join(cwd, 'index.js'),
    await readFile(join(__dirname, 'action.tmpl.js')),
  );

  await Execa(
    'ncc',
    ['build', join(cwd, 'index.js'), '--out', cwd, '--source-map'],
    {
      stdio: 'inherit',
      preferLocal: true,
    },
  );

  await write(
    join(cwd, 'action.yml'),
    parse(
      stringify({
        name: `yarn ${name}`,
        author,
        description,
        inputs: parseInputs(inputs),
        outputs: {
          stdout: {
            description: 'process stdout',
          },
          stderr: {
            description: 'process stderr',
          },
        },
        runs: {
          using: 'node12',
          main: 'index.js',
        },
      }),
    ),
  );

  await Del(join(cwd, 'manifest.json'));
};

Main(async () => {
  return ForEach(Object.keys(commands), name => {
    return handleCommand({
      name,
      ...commands[name],
      cwd: join(__dirname, '..', name),
    });
  });
});
