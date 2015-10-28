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

var paths = {
  scripts: ["./client/app/app.js", "./client/app/**/*.js"],
  styles: "./client/styles/*.css",
  index: "./client/index.html",
  partials: ["./client/app/**/*.html"],
  distDev: './dist.dev'
};

var pipes = {};


//use angular-file-sort to build order of dependencies
pipes.orderedAppScripts = function(){
  return plugins.angularFilesort();
};


pipes.orderedVendorScripts = function() {
    return plugins.order(['jquery.js', 'angular.js']);
};

pipes.validatedAppScripts = function() {
    return gulp.src(paths.scripts)  
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
};

pipes.builtAppScriptsDev = function() {
    return pipes.validatedAppScripts()
        .pipe(gulp.dest(paths.distDev));
};

pipes.builtVendorScriptsDev = function() {
    return gulp.src(bowerFiles())
        .pipe(gulp.dest('dist.dev/bower_components'));
};

pipes.validatedPartials = function() {
    return gulp.src(paths.partials)
        .pipe(plugins.htmlhint({'doctype-first': false}))
        .pipe(plugins.htmlhint.reporter());
};

pipes.builtPartialsDev = function() {
    return pipes.validatedPartials()
        .pipe(gulp.dest(paths.distDev));
};

pipes.scriptedPartials = function() {
    return pipes.validatedPartials()
        .pipe(plugins.htmlhint.failReporter())
        .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(plugins.ngHtml2js({
            moduleName: "healthyGulpAngularApp"
        }));
};

pipes.builtStylesDev = function() {
    return gulp.src(paths.styles)
        .pipe(gulp.dest(paths.distDev));
};

pipes.validatedIndex = function() {
    return gulp.src(paths.index)
        .pipe(plugins.htmlhint())
        .pipe(plugins.htmlhint.reporter());
};

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

gulp.task('validate-partials', pipes.validatedPartials);

gulp.task('validate-index', pipes.validatedIndex);

gulp.task('build-index-dev', pipes.builtIndexDev);

gulp.task("default", function() {
  console.log("Hello World");
});

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