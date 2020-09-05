const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/index.js',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/env', '@babel/preset-react']
				}
			},
			{
				test: /\.((png)|(jpeg)|(jpg)|(ttf)|(otf)|(woff)|(woff2)|(ico)|(svg)|(eot))$/,
				loader: 'file-loader',
				options: {
					esModule: false,
					name: (resourcePath, resourceQuery) => {
						if (/\.((png)|(jpeg)|(jpg)|(ico))$/.test(resourcePath)) {
							return 'assets/images/[name].[ext]';
						}
						else if (/\.((ttf)|(otf)|(woff)|(woff2)|(ico)|(svg)|(eot))$/.test(resourcePath)) {
							return 'assets/fonts/[name].[ext]';
						}
						return 'assets/others/[name].[ext]';
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					'css-loader'
				]
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx'],
		alias: {
			'react': 'preact/compat',
			'react-dom': 'preact/compat'
		}
	},
	output: {
		path: path.resolve(__dirname, 'dist/'),
		publicPath: '/',
		chunkFilename: 'js/[name].raisely.js',
		filename: 'js/[name].raisely.js'
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'dist/'),
		index: 'index.html',
		historyApiFallback: {
			index: 'index.html'
		},
		port: 3000,
		publicPath: 'http://localhost:3000/',
		liveReload: true,
		clientLogLevel: 'debug',
		watchContentBase: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			chunkFilename: 'css/[name].raisely.css',
			moduleFilename: () => 'css/[name].raisely.css'
		})
	]
}