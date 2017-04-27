const babelOptions = {
	presets: [['es2015', { modules: false, loose: true }], 'react', 'stage-3'],
};

module.exports = {
	entry: {
		usage_1: './draft/usage_1/usage_1.js',
		usage_config: './draft/usage_config/usage_config.js',
		usage_server: './draft/usage_server/usage_server.js',
	},
	output: {
		filename: 'draft/[name]/dist/[name].bundle.js'
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				options: babelOptions,
			}
		]
	}
}