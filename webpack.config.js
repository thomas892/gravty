const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const extractSass = new ExtractTextPlugin({
    filename: "./style/style.css"
})

module.exports = {
    context: path.join(__dirname, "src"),
    devtool: "sourcemap",
    entry: ["./js/app.js"],
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
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use:[
                        {loader: "css-loader"},
                        {loader: "sass-loader"}
                    ],
                    fallback: "style-loader"

                })
            }
        ]
    },
    plugins: [
        extractSass
    ]


}
