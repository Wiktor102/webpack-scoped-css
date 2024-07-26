const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { getCssLoaders } = require('../src/index');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
	mode: isDevelopment ? 'development' : 'production',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: require.resolve('babel-loader'),
					options: {
						plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
					},
				},
			},
			getCssLoaders({}, true)
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		isDevelopment && new ReactRefreshWebpackPlugin()
	].filter(Boolean),
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		port: 9000,
		hot: true,
	},
	devtool: isDevelopment ? "eval" : false
};