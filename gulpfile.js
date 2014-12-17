var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	watch = require('gulp-watch'),
	plumber = require('gulp-plumber');

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

gulp.task('watch', function() {
  gulp.watch('assets/js/app/**/*.js', ['concat']);
  gulp.watch('assets/js/min/*.js', ['compress']);
});