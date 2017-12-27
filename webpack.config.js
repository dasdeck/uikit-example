const path = require('path');
const webpack = require('webpack');
const rules = [
  
  {
		loader: 'babel-loader',
		test: /\.js$/
	},
  
  {
		use: ['style-loader','css-loader'],
		test: /\.css$/
	}

];

const resolve = {
		extensions: ['.js']
	};
const entry = './src/index.js';

// setup top load UIkit internally

const configs = [{
		entry,
		module: {
			rules
		},
		plugins:[
      new webpack.DefinePlugin({
        BUNDLED: true
      })
    ],
		resolve,
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'dist')
		}
	},

	// setup top load UIkit externally
	{
		entry,
		module: {
			rules
		},
		resolve,
		output: {
			filename: 'external.js',
			path: path.resolve(__dirname, 'dist')
		},
		plugins:[
      new webpack.DefinePlugin({
        BUNDLED: false
      })
    ],
		externals: {
			'uikit': 'UIkit',
			'uikit/dist/js/uikit-icons': 'window' //dummy for external builds
		}
	}

];

//add typescript related settings
module.exports = configs;
[].concat(configs.map(conf => {

	const alteration = JSON.parse(JSON.stringify(conf)); // clone deep

	//add typescript settings
	alteration.entry = alteration.entry.replace('.js', '.ts');
	alteration.output.filename = alteration.output.filename.replace('.js', '.ts.js');
	alteration.module.rules.push({
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/
  })
  alteration.resolve.extensions = ['.ts'];
	return alteration;
}));