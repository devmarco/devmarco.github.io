var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

gulp.task('concat', function() {
  gulp.src(['assets/js/app/core/**/*.js','assets/js/app/*.js'])
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('assets/js/min/'))
});

gulp.task('compress', function() {
  gulp.src('assets/js/min/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/min/'))
});