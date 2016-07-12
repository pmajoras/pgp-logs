'use strict';

var eslint = require('gulp-eslint');
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');

var paths = {
  apiScripts: ['api/**/*.js',
    '!bower_components/**/*.js',
    '!coverage/**/*.js',
    '!www/client.min.js',
    '!node_modules/**/*.js',
    '!typings/*.ts'
  ],
  webScripts: ['www/**/*.js',
    '!bower_components/**/*.js',
    '!coverage/**/*.js',
    '!www/client.min.js',
    '!www/js/jquery-rest.js',
    '!node_modules/**/*.js',
    '!typings/*.ts'
  ]
};

gulp.task('eslint:api', function () {
  return gulp.src(paths.apiScripts)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('eslint:web', function () {
  return gulp.src(paths.webScripts)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

///////////
// Tasks //
///////////
gulp.task('sass', function () {
  return gulp.src('./www/css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./www/dist/'));
});

gulp.task('sass:vendors', function () {
  return gulp.src('./www/css/vendors.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./www/dist/'));
});

gulp.task('styles', ['sass:vendors', 'sass']);

// configure which files to watch and what tasks to use on file changes
gulp.task('watch:scss', function () {
  gulp.watch('./www/css/**/*.scss', ['styles']);
});

// Builds the application
gulp.task('build', ['eslint:api', 'eslint:web', 'styles']);

gulp.task('default', ['build']);
