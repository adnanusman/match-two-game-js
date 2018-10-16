var gulp = require('gulp');

gulp.task('copy-html', function() {
  gulp.src('src/index.html')
  .pipe(gulp.dest('build'))
})