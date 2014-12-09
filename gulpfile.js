var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

gulp.task('concat', function() {
  gulp.src('assets/js/core/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('assets/js/'))
});

gulp.task('compress', function() {
  gulp.src('assets/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/'))
});