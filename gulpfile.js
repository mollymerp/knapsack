var gulp = require("gulp");
var bowerFiles = require("main-bower-files");
var uglify = require("gulp-uglify");
var plugins = require('gulp-load-plugins')();
var jshint = require("gulp-jshint");
var clean = require("gulp-clean");
var minifyCss = require("gulp-minify-css");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var connect = require('gulp-connect');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var es = require('event-stream');

//commonly used files paths stored here in an object for easy reference
var paths = {
  scripts: "./client/app/**/*.js",
  styles: "./client/styles/*.css",
  index: "./client/index.html",
  partials: "./client/app/**/*.html",
  distDev: './dist.dev',
  distProd: './dist.prod',
  distScriptsProd: './dist.prod/scripts'
};

//storing helper functions in an object
var pipes = {};


//use angular-file-sort to build order of dependencies
pipes.orderedAppScripts = function(){
  return plugins.angularFilesort();
};

//if jquery is being uses, ensures that it takes precedence when arranging vendor scripts
pipes.orderedVendorScripts = function() {
    return plugins.order(['jquery.js', 'angular.js']);
};

//can be used at anytime to add .min to file names
pipes.minifiedFileName = function() {
    return plugins.rename(function (path) {
        path.extname = '.min' + path.extname;
    });
};

//jshint for scripts
pipes.validatedAppScripts = function() {
    return gulp.src(paths.scripts)  
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
};

//just adds the unminified scripts into a new directory for dev usage
pipes.builtAppScriptsDev = function() {
    return pipes.validatedAppScripts()
        .pipe(gulp.dest(paths.distDev));
};

//minifies and concatenates scripts for production usage. The output is a new directory called
// dist.prod. Currently does not work
pipes.builtAppScriptsProd = function() {
    var scriptedPartials = pipes.scriptedPartials();
    var validatedAppScripts = pipes.validatedAppScripts();

    return es.merge(scriptedPartials, validatedAppScripts)
        .pipe(pipes.orderedAppScripts())
        .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat('app.min.js'))
            .pipe(ngAnnotate())
            .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(paths.distScriptsProd));
};

//outputs bower scripts into dev directory
pipes.builtVendorScriptsDev = function() {
    return gulp.src(bowerFiles())
        .pipe(gulp.dest('dist.dev/bower_components'));
};

//minifies and concats vendor scripts
pipes.builtVendorScriptsProd = function() {
    return gulp.src(bowerFiles('**/*.js'))
        .pipe(pipes.orderedVendorScripts())
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.distScriptsProd));
};

//runs htmlHint on angular templats
pipes.validatedPartials = function() {
    return gulp.src(paths.partials)
        .pipe(plugins.htmlhint({'doctype-first': false}))
        .pipe(plugins.htmlhint.reporter());
};

//outputs all client html files into dev directory
pipes.builtPartialsDev = function() {
    return pipes.validatedPartials()
        .pipe(gulp.dest(paths.distDev));
};

//this function runs html hint on html files in client. It also uses a plugin to turn the html files into an Angular module to be used in the Angular templateCache. Uncomment the failReporter() function to cancel the function from completing if there is an html syntax error
pipes.scriptedPartials = function() {
    return pipes.validatedPartials()
        // .pipe(plugins.htmlhint.failReporter())
        .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(plugins.ngHtml2js({
            moduleName: "knapsack"
        }));
};

//outputs any files in the client/styles directory into dev director
pipes.builtStylesDev = function() {
    return gulp.src(paths.styles)
        .pipe(gulp.dest(paths.distDev));
};

//minifies anything in the styles directory
pipes.builtStylesProd = function() {
    return gulp.src(paths.styles)
        .pipe(plugins.sourcemaps.init())
            .pipe(plugins.minifyCss())
        .pipe(plugins.sourcemaps.write())
        .pipe(pipes.minifiedFileName())
        .pipe(gulp.dest(paths.distProd));
};

//checks index.html for syntax issues
pipes.validatedIndex = function() {
    return gulp.src(paths.index)
        .pipe(plugins.htmlhint())
        .pipe(plugins.htmlhint.reporter());
};

//rebuilds the index.html file into the dev directory automatically adding updating the dependency script source URLs
pipes.builtIndexDev = function() {

    var orderedVendorScripts = pipes.builtVendorScriptsDev()
        .pipe(pipes.orderedVendorScripts());

    var orderedAppScripts = pipes.builtAppScriptsDev()
        .pipe(pipes.orderedAppScripts());

    var appStyles = pipes.builtStylesDev();

    return pipes.validatedIndex()
        .pipe(gulp.dest(paths.distDev)) // write first to get relative path for inject
        .pipe(plugins.inject(orderedVendorScripts, {relative: true, name: 'bower'}))
        .pipe(plugins.inject(orderedAppScripts, {relative: true}))
        .pipe(plugins.inject(appStyles, {relative: true}))
        .pipe(gulp.dest(paths.distDev));
};

//rebuilds the index.html file into the dev directory automatically adding updating the dependency script source URLs and referencing the new minified JS file
pipes.builtIndexProd = function() {

    var vendorScripts = pipes.builtVendorScriptsProd();
    var appScripts = pipes.builtAppScriptsProd();
    var appStyles = pipes.builtStylesProd();

    return pipes.validatedIndex()
        .pipe(gulp.dest(paths.distProd)) // write first to get relative path for inject
        .pipe(plugins.inject(vendorScripts, {relative: true, name: 'bower'}))
        .pipe(plugins.inject(appScripts, {relative: true}))
        .pipe(plugins.inject(appStyles, {relative: true}))
        .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest(paths.distProd));
};


gulp.task('validate-partials', pipes.validatedPartials);

gulp.task('validate-index', pipes.validatedIndex);

gulp.task('build-index-dev', pipes.builtIndexDev);

gulp.task('build-app-scripts-prod', pipes.builtAppScriptsProd);

gulp.task('build-index-prod', pipes.builtIndexProd);

gulp.task('validate-index', pipes.validatedIndex)

gulp.task("angular-filesort", function(){
  gulp.src(paths.index)
  .pipe(inject(
        gulp.src(paths.scripts).pipe(angularFilesort())
        ))
  .pipe(gulp.dest("./dest/"))
});

gulp.task('connect', function() {
  connect.server();
});

gulp.task("jshint", function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"));
});

gulp.task("clean", function() {
    gulp.src("./dist.prod")
      .pipe(clean({force: true}));
});

gulp.task("clean-dev", function() {
    gulp.src("./dist.dev")
      .pipe(clean({force: true}));
});

gulp.task("minify-css", function(){
  var opts = {comments:true,spare:true};
  gulp.src(paths.styles)
  .pipe(minifyCss(opts))
  .pipe(rename({
    extname: ".min.css"
  }))
  .pipe(gulp.dest("./dist/"))
});

gulp.task("minify-js", function(){
  gulp.src(paths.scripts)
  .pipe(concat("all.js"))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(gulp.dest("./dist/"))
});

gulp.task("main-bower-files", function(){
  gulp.src(bowerFiles())
  .pipe(uglify())
  .pipe(concat("vendor.min.js"))
  .pipe(gulp.dest("./dist/"))
});


gulp.task("template-cache", function(){
  gulp.src(paths.partials)
  .pipe(templateCache({standalone:true, root:"app/"}))
  .pipe(gulp.dest("./dist/"))
});

gulp.task('build',
  ['jshint', 'minify-css', 'minify-js', 'main-bower-files', 'template-cache', 'connect']
);