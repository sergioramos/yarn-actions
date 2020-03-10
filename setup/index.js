const Handler = require('../_setup');

const handleError = err => {
  console.error(err);
  process.exit(1);
};

Handler(require('./manifest.json'))
  .then(code => process.exit(code))
  .catch(handleError);
