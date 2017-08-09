var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var minify_css = require('gulp-minify-css');
var plumber = require('gulp-plumber'); //错误管理 提示
var strip = require('gulp-strip-comments'); //删除注释 
var babel = require('gulp-babel'); //babel转换

var paths = {
  app: ['src/component/*.js', 'src/page/*.js'],
  tpl: ['src/page/**/*.html'],
  css: ['src/page/**/*.css'],
  assets: ['src/assets/**/*.*','src/assets/image/**/*.*']
};

// gulp.task('app', function () {
//   gulp.src(paths.app)
//     .pipe(babel({
//       presets: ['es2015'],
//       plugins: ["transform-es2015-modules-umd"]
//     }))
//     .pipe(plumber())
//     .pipe(strip())  //去除注释
//     .pipe(uglify({
//       compress: false,
//     }))
//     .pipe(plumber.stop())
//     .pipe(gulp.dest('www/build'))
//     .pipe(connect.reload());
// });

gulp.task('app', function () {
  gulp.src(paths.app)
    .pipe(plumber())
    .pipe(plumber.stop())
    .pipe(connect.reload());
});

gulp.task('tpl', function (done) {
  gulp.src(paths.tpl)
    .pipe(plumber())
    .pipe(plumber.stop())
    .pipe(gulp.dest('www'))
    .pipe(connect.reload())
    .on('end', done);
});

gulp.task('assets', function (done) {
  gulp.src(paths.assets)
    .pipe(plumber())
    .pipe(plumber.stop())
    .pipe(gulp.dest('www/assets'))
    .pipe(connect.reload())
    .on('end', done);
});

gulp.task('css', function (done) {
  gulp.src(paths.css)
    .pipe(concat('main.css'))
    .pipe(minify_css())
    .pipe(plumber())
    .pipe(plumber.stop())
    .pipe(gulp.dest('www/build'))
    .pipe(connect.reload())
    .on('end', done);
});


gulp.task('server', function () {
  connect.server({
    root: 'www',
    port: 8888,
    livereload: true
  })
});

gulp.task('watch', function () {
  gulp.watch(paths.app, ['app']);
  gulp.watch(paths.tpl, ['tpl']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.assets, ['assets']);
});

gulp.task('default', ['server', 'watch','css','assets']);