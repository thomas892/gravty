const path = require('path');


module.exports = {
    context: path.join(__dirname, "src"),
    devtool: "sourcemap",
    entry: ["./js/app.js", './style/style.scss'],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: 'style/[name].css'
                        }
                    },
                    {
                        loader: "extract-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    },
                ]
            }

        ]
    },
};
