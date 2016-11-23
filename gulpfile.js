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
gulp.task('watch',['browserSyn'], () => {
   gulp.watch(['public/*.css', '*.html', 'src/*.js', '*.js', 'spec/*.js', 'public/src/*.js'], browserSync.reload);
});
//
//gulp.watch('public/*.css', browserSync.reload);
//   gulp.watch('*.html', browserSync.reload);
//   gulp.watch('src/*.js', browserSync.reload);
//   gulp.watch('*.js', browserSync.reload);
//   gulp.watch('spec/*.js', browserSync.reload);
//   gulp.watch('public/src/*.js', browserSync.reload);