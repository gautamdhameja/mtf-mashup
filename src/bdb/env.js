const jetpack = require('fs-jetpack')

// The variables have been written to `env.json` by the build process.
const env = jetpack.cwd(__dirname).read('env.json', 'json');

module.exports = env
