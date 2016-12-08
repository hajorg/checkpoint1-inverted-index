/* eslint amd:true */
const gulp = require('gulp');
const browserSync = require('browser-sync');

gulp.task('browserSyn', () => {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    },
    port: process.env.PORT || 3000,
    open: false
  });
});
gulp.task('app', ['browserSyn'], () => {
  gulp.watch(['src/**/*.css', '*.html', 'src/*.js', '*.js', 'spec/*.js'], browserSync.reload);
});
// Jasmine test task
gulp.task('test', () => {
  browserSync.init({
    server: {
      baseDir: ['./jasmine', './src'],
      index: 'SpecRunner.html'
    }
  });
  gulp.watch(['./jasmine/spec/inverted-index-test.js'], browserSync.reload);
});
gulp.task('default', ['app']);
