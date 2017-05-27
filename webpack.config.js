process.env.NODE_ENV = 'development';
const debug = process.env.NODE_ENV !== "production";
const path = require('path');


module.exports = {
    context: path.join(__dirname, "src"),
    devtool: debug ? "sourcemap" : null,
    entry: "./js/app.js",
    output: {
        path: path.join(__dirname, "src"),
        filename: "./bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    }

}
