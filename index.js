const path = require('path');
const fs = require('fs');

module.exports = {
    getPath: () => path.join(__dirname, 'build'),
    setConfig: (json) => fs.writeFileSync(path.join(__dirname, 'build','config.js'), json, "utf8")
};
