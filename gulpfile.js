const gulp = require('gulp');
const browserSync = require('browser-sync');
gulp.task('browserSyn', () => {
  browserSync.init({
    server: {
      baseDir: './',
        index: 'index.html'
      }
  });
});
gulp.task('app',['browserSyn'], () => {
  gulp.watch(['public/*.css', '*.html', 'src/*.js', '*.js', 'spec/*.js', 'public/src/*.js'], browserSync.reload);
});