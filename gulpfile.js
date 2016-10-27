'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const mocha = require('gulp-spawn-mocha');
const gutil = require('gulp-util');
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config.js").common;
const devConfig = require("./webpack.config.js").devServer;
 
gulp.task(`sass`, () => {
  return gulp.src(`./src/assets/stylesheets/**/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

gulp.task(`watch-dev-server`, [`webpack-dev-server`], () => {
    gulp.watch([`src/**`,`test/**`], [`webpack-dev-server`]);
});

gulp.task(`mocha`, () => {
    return gulp.src(`test/**/*.spec.js`)
        .pipe(mocha())
        .on(`error`, (err) => {
            if(err) throw new gutil.PluginError("unit tests", err);
        });
});

gulp.task(`default`, [`sass`]);

gulp.task("webpack:build", (callback) => {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			"process.env": {
				// This has effect on the react lib size
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);

	// run webpack
	webpack(myConfig, (err, stats) => {
		if(err) throw new gutil.PluginError("webpack:build", err);
		/* Un comment to print stats
        gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));*/
		callback();
	});
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", (callback) => {
	// run webpack
	devCompiler.run( (err, stats) => {
		if(err) throw new gutil.PluginError("webpack:build-dev", err);
		callback();
	});
});

gulp.task("webpack-dev-server", [`mocha`, `sass`], (callback) => {
	// modify some webpack config options
	var myConfig = Object.create(devConfig);
	myConfig.devtool = "eval";
	myConfig.debug = true;
    /*myConfig.devServer = {
            contentBase: './dist',
            hot: true
        };
    myConfig.plugins= [
			new webpack.HotModuleReplacementPlugin()
		];*/

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig),{
        publicPath: '/' + myConfig.output.publicPath,
        stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        },
        hot: true,
        contentBase: 'dist/'
    }).listen(8080, "localhost", (err) => {
		if(err) throw new gutil.PluginError("webpack-dev-server", err);
		gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
	});
});