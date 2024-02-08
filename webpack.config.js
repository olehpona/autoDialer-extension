const path = require('path');

module.exports = {
    entry: './src/popup.js',
    mode: "production",
    output: {
        filename: 'popup.js',
        path: path.resolve(__dirname, 'popup'),
    },
};