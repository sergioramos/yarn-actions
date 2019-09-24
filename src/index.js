const { writeFile, readFile } = require('mz/fs');
const { series: ForEach } = require('apr-for-each');
const Main = require('apr-main');
const Del = require('del');
const Execa = require('execa');
const Mkdir = require('make-dir');
const { write } = require('node-yaml');
const { join, relative } = require('path');

const { author } = require('../package.json');
const { commands, inputs: globalInputs } = require('./manifest.json');
const ROOT = join(__dirname, '..');
const { parse, stringify } = JSON;

const parseInputs = (inputs = {}) => {
  return Object.keys(inputs).reduce((sum = {}, name) => {
    const { description, required = false, dflt } = inputs[name];
    return Object.assign({}, sum, {
      [name]: parse(
        stringify({
          description,
          required,
          default: dflt,
        }),
      ),
    });
  }, {});
};

const handleCommand = async (cmd, parent = []) => {
  const { name, description, cwd, ext, yml = {} } = cmd;
  const { commands = [], inputs: cmdInputs } = cmd;

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
    stringify({ name: parent.concat(name).filter(Boolean), inputs }, null, 2),
  );

  const actionjs = await readFile(join(__dirname, 'action.tmpl.js'), 'utf-8');
  await writeFile(
    join(cwd, 'index.js'),
    actionjs.replace('<%handler%>', relative(cwd, join(ROOT, '_handler'))),
  );

  await Execa(
    'ncc',
    [
      'build',
      join(cwd, 'index.js'),
      '--out',
      cwd,
      '--source-map',
      '--external',
      ext,
    ],
    {
      stdio: 'inherit',
      preferLocal: true,
    },
  );

  await write(
    join(yml.path || cwd, 'action.yml'),
    parse(
      stringify({
        name: yml.name || `yarn ${name}`,
        author,
        description: yml.description || description,
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
          main: yml.main || 'index.js',
        },
        branding: {
          icon: 'package',
          color: 'blue',
        },
      }),
    ),
  );

  await Del(join(cwd, 'manifest.json'));

  await ForEach(Object.keys(commands), cmd => {
    return handleCommand(
      {
        name: cmd,
        ...commands[cmd],
        ext: '../../_handler',
        cwd: join(cwd, cmd),
      },
      [name],
    );
  });
};

Main(async () => {
  await Del(join(__dirname, '../_handler'));

  await Execa(
    'ncc',
    [
      'build',
      join(__dirname, 'handler.js'),
      '--out',
      join(__dirname, '../_handler'),
      '--source-map',
    ],
    {
      stdio: 'inherit',
      preferLocal: true,
    },
  );

  await ForEach(Object.keys(commands), name => {
    return handleCommand({
      name,
      ...commands[name],
      ext: '../_handler',
      cwd: join(__dirname, '..', name),
    });
  });

  const dflt = Object.keys(commands).find(name => commands[name].default);
  return handleCommand({
    ...commands[dflt],
    name: dflt,
    cwd: join(__dirname, '..', '_fallback'),
    ext: '../_handler',
    yml: {
      name: 'yarn actions',
      description: '📦🐈 Fast, reliable, and secure dependency management',
      path: join(__dirname, '..'),
      main: '_fallback/index.js',
    },
  });
});
