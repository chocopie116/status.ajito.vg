var webpack = require('webpack');
var loadenv = require("node-env-file");

console.log(process.env.MESSAGES_API_ENDPOINT);

module.exports = {
    entry : './src/main.js',
    output: {
        filename: 'public/dist/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.MESSAGES_API_ENDPOINT': JSON.stringify(process.env.MESSAGES_API_ENDPOINT)
        })
    ],
    resolve: {
        extensions: ['', '.js']
    }
};

