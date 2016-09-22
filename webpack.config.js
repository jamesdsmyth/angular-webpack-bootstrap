module.exports = {
    entry: './app/index.js',

    output: {
        filename: 'bundle.js',
        publicPath: ''
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /(\.css|\.scss)$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /(\.png|\.jpg)$/,
                loader: 'url-loader?limit=1000000'
            }
        ]
    }
};
