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
  partials: ["./client/app/**/*.html"]
};

var pipes = {};

pipes.orderedAppScripts = function(){
  return plugins.angularFilesort();
}

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
    gulp.src("./dist/*")
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