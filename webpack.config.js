const path = require("path");

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {test: /\.js$/,
            exclude: /node_modules/,
            use: 
                {loader: 'babel-loader'}
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    mode: 'development'
};