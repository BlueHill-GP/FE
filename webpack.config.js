const path = require('path');

module.exports = {
    // ... other webpack config options ...
    resolve: {
        fallback: {
            fs: false,
            path: require.resolve('path-browserify'),
            os: require.resolve('os-browserify/browser'),
        },
    },
};