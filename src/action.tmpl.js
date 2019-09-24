const Main = require('apr-main');
const Exec = require('<%handler%>');
const manifest = require('./manifest.json');

Main(async () => {
  const exitCode = await Exec(manifest);
  process.exit(exitCode);
});
