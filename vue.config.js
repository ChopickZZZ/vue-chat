module.exports = {
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