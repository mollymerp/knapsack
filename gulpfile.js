var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();
var del = require("del");
var bowerFiles = require("main-bower-files");
var uglify = require("gulp-uglify")

var paths = {
  scripts: ["./client/app/app.js", "./client/app/**/*.js"],
  styles: "./client/styles/*.css",
  index: "./client/index.html",
  partials: ["./client/app/**/*.html"],
  distDev: "./dist-dev",
  distProd: "./dist-prod",
  distScriptsProd: "./dist-prod/scripts"
};

var pipes = {};

gulp.task('default', function() {
  console.log("Hello World");
});

gulp.task('jshint', function() {
  return gulp.src('client/app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('minify', function () {
   gulp.src(paths.scripts)
      .pipe(uglify())
      .pipe(gulp.dest(paths.distProd))
});