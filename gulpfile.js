var gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('copy-html', function() {
  gulp.src('src/index.html')
  .pipe(gulp.dest('build'))
})

// Serve Application on localhost
gulp.task('serve', function() {
  browserSync.init({
    server: "./build",
    port: 3000
  });
  browserSync.stream();
});

gulp.task('default', ['copy-html', 'serve']);