const path = require('path')

module.exports = {
	outputDir: path.resolve(__dirname, './server/public'),
	devServer: {
		proxy: {
			'^/rooms': {
				target: 'http://localhost:3000',
				changeOrigin: true
			},
		}
	},
	configureWebpack: {
		module: {
			rules: [
				{
					test: /\.mjs$/,
					include: /node_modules/,
					type: "javascript/auto"
				}
			]
		}
	}
}