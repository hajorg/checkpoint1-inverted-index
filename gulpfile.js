/* eslint amd:0 */
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
  gulp.watch(['public/*.css', '*.html', 'src/*.js', '*.js', 'spec/*.js', 'public/src/*.js'], browserSync.reload);
});
gulp.task('default', ['app']);
