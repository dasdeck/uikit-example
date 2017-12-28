const path = require('path');
const webpack = require('webpack');

const babelLoader = {
	loader: 'babel-loader',
	test: /\.js$/
};

const cssLoader =  {
	test: /\.css$/,
	use: ['style-loader','css-loader'],
	
};

const rules = [
  
	babelLoader,
	cssLoader

];

const resolve = {
		extensions: ['.js']
	};
const entry = './src/bundle.js';


const configs = [
	
	//custom bundle build
	{
		entry: './src/separate.js',
		module: {
			rules
		},
		resolve,
		output: {
			filename: 'separated.js',
			path: path.resolve(__dirname, 'dist')
		}
	},
	
	// setup top load UIkit internally
	{
		entry: './src/bundle.js',
		module: {
			rules
		},
		resolve,
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'dist')
		}
	},

	// setup top load UIkit externally
	{
		entry: './src/extern.js',
		module: {
			rules
		},
		resolve,
		output: {
			filename: 'external.js',
			path: path.resolve(__dirname, 'dist')
		},
		externals: {
			'uikit': 'UIkit',
		}
	}

];

//add typescript related settings
// module.exports = configs;

module.exports = configs.concat(configs.map(conf => {
	const alteration = JSON.parse(JSON.stringify(conf)); // clone deep
	//add typescript settings
	alteration.entry = alteration.entry.replace('.js', '.ts');
  alteration.output.filename = alteration.output.filename.replace('.js', '.ts.js');
	
	const advancedCSSLoader = Object.assign({}, cssLoader);
	advancedCSSLoader.use = ['style-loader',{
		loader: 'typings-for-css-modules-loader',
		options: {
			modules: true,
			namedExport: true,
			camelCase: true
		}
	},'css-loader'];
	
	alteration.module.rules = [babelLoader, advancedCSSLoader, {
    test: /\.ts$/,
		use: 'ts-loader',
		exclude: /node_modules/
	}].concat(conf.module.rules);//.concat()
	
  alteration.plugins = conf.plugins; //restore plugins
  alteration.resolve.extensions = ['.ts'];
	return alteration;
}));