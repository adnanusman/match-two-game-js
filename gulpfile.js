var gulp = require('gulp');
const browserSync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');

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

// Minify and copy CSS files to the build folder
gulp.task('min-css', function() {
  return gulp.src('src/css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('build/css'))
    // .pipe(connect.reload())
});

// Watch files for changes
gulp.task('watch', function() {
  gulp.watch('src/css/*.css', ['min-css']).on('change', browserSync.reload);
  gulp.watch('src/*.html', ['copy-html']).on('change', browserSync.reload);
})

gulp.task('default', ['copy-html', 'serve', 'watch']);