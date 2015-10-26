var gulp = require("gulp");
var bowerFiles = require("main-bower-files");
var uglify = require("gulp-uglify");
var jshint = require("gulp-jshint");
var clean = require("gulp-clean");
var minifyCss = require("gulp-minify-css");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var templateCache = require('gulp-angular-templatecache');

var paths = {
  scripts: ["./client/app/app.js", "./client/app/**/*.js"],
  styles: "./client/styles/*.css",
  index: "./client/index.html",
  partials: ["./client/app/**/*.html"]
};

var pipes = {};

gulp.task("default", function() {
  console.log("Hello World");
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
  .pipe(templateCache())
  .pipe(gulp.dest("./dist/"))
})

gulp.task("minify", function () {
   gulp.src(paths.scripts)
      .pipe(uglify())
      .pipe(gulp.dest(paths.distProd))
});