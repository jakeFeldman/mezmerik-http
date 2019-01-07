const path = require('path');

const ENVIRONMENT = process.env.NODE_ENV || 'development';

module.exports = {
    mode: ENVIRONMENT,
    entry: [
        path.resolve(__dirname, 'polyfills'),
        path.resolve('src', 'index')
    ],
    output: {
        filename: 'http.js',
        path: path.resolve('lib'),
        publicPath: '/',
        library: 'http',
        libraryTarget: 'commonjs2',

    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            eslintPath: require.resolve('eslint'),
                        }
                    }
                ]
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                include: [
                    path.resolve('src'),
                ],
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    }
};
