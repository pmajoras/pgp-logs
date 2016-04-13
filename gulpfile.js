"use strict";

var eslint = require('gulp-eslint');
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');

var paths = {
  scripts: ['**/*.js',
    '!bower_components/**/*.js',
    '!www/client.min.js',
    '!node_modules/**/*.js',
    '!typings/*.ts'],
};

gulp.task('eslint', function() {
  return gulp.src(paths.scripts)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

///////////
// Tasks //
///////////
gulp.task('sass', function() {
  return gulp.src('./www/css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
			cascade: false}
      ))
    .pipe(gulp.dest('./www/dist/'));
});

gulp.task('sass:vendors', function() {
  return gulp.src('./www/css/vendors.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./www/dist/'));
});

gulp.task('styles',['sass:vendors', 'sass']);

// Builds the application
gulp.task('build', ['eslint', 'styles']);

gulp.task('default', ['build']);