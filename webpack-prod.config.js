const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
 

module.exports = {
	entry: './src/index.js',
	mode: 'production',
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
				test: /\.((png)|(jpeg)|(jpg)|(ico)|(ttf)|(otf)|(woff)|(woff2)|(svg)|(eot))$/,
				loader: 'file-loader',
				options: {
					name: (resourcePath, resourceQuery) => {
						console.warn(resourcePath);
						if (/\.((png)|(jpeg)|(jpg)|(ico))$/.test(resourcePath)) {
							return 'assets/images/[name].[ext]';
						}
						else if (/\.((ttf)|(otf)|(woff)|(woff2)|(ico)|(svg)|(eot))$/.test(resourcePath)) {
							return 'assets/fonts/[name].[ext]';
						}
						return 'assets/others/[name].[ext]';
					},
					esModule: false
				}
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '/dist/'
						}
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
		publicPath: '/dist',
		chunkFilename: 'js/[name].raisely.js',
		filename: 'js/[name].raisely.js'
	},
	optimization: {
		minimize: true,
		splitChunks: {
			chunks: 'async'
		},
		minimizer: [
			new TerserPlugin({
				test: /\.js/
			}),
			new OptimizeCSSAssetsPlugin({
				cssProcessorOptions: {
					safe: true,
					discardComments: {
						removeAll: true
					},
					autoPrefixer: {
						disable: true
					}
				}
			})
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			chunkFilename: 'css/[name].raisely.css',
			moduleFilename: () => 'css/[name].raisely.css'
		}),
		new BundleAnalyzerPlugin({
			statsFileName: __dirname + '/../stats.json',
			generateStatsFile: true
		}),
		new CompressionPlugin({
			test: /\.(js)|(css)$/,
			algorithm: 'gzip',
			compressionOptions: {
				level: 9
			}
		})
	]
}