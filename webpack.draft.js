const babelOptions = {
	presets: [['es2015', { modules: false, loose: true }], 'react', 'stage-3'],
};

module.exports = {
	entry: {
		usage_1: './draft/usage_1/usage_1.js'
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