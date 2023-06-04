const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "development",
	entry: {
		main: "./src/js/main.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [ "@babel/preset-env" ]
					}
				}
			},
			{
				test: /\.(s(a|c)ss)$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "sass-loader",
						options: {
							implementation: require("sass"),
							sassOptions: {
								indentWidth: 4,
								outputStyle: "compressed"
							}
						}
					}
				]
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: "./src/audio",
					to: "audio"
				}
			]
		}),
		new HtmlWebpackPlugin({
			title: "You Are An Idiot!",
			description: "The best website to ever exist on the internet.",
			filename: "./index.html",
			hash: true
		}),
		new MiniCssExtractPlugin({
			filename: "[name].bundle.css",
			chunkFilename: "[id].chunk.css"
		})
	],
	output: {
		clean: true,
		path: path.resolve(__dirname, "build"),
		filename: "[name].bundle.js",
		publicPath: "/"
	}
}
