'use strict';

var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'),
    minifyCss   = require('gulp-minify-css'),
    url         = require('url'),
    fs          = require('fs'),
    changeCase  = require('change-case'),
    PORT_APP    = 5000;

gulp.task('styles', function() {
    gulp
    .src('app/styles/*.css')
    .pipe(minifyCss())
    .pipe(concat('index.css'))
    .pipe(gulp.dest('dist/styles/'));
});

gulp.task('index', function() {
    gulp
    .src('app/index.html')
    .pipe(gulp.dest('dist/'));
    gulp
    .src('app/favicon.ico')
    .pipe(gulp.dest('dist/'));
});

gulp.task('elements', function() {
    gulp
    .src([
        'app/modules/**/*.html',
        'app/modules/**/*.css',
        'app/modules/**/*.js'
    ])
    .pipe(gulp.dest('dist/elements'));
});

gulp.task('images', function() {
    gulp
    .src(['app/images/**/{*.png,*.jpg}'])
    .pipe(gulp.dest('dist/images'));
});

gulp.task('scripts', function() {
    gulp
    .src(['app/scripts/*.js'])
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('vendor', function() {
    gulp
    .src([
        'bower_components/**/*'
    ])
    .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('build', ['index', 'elements', 'scripts', 'vendor', 'images', 'styles']);

gulp.task('serve', function() {
    browserSync({
        port: PORT_APP,
        server: {
            baseDir: ['dist'],
            middleware: function(req, res, next) {
                var fileName = url.parse(req.url).path;
                var fileExists = fs.existsSync('./app/modules/pages/' + changeCase.camelCase(fileName) + '.html');

                if (fileExists) {
                    req.url = '/index.html';
                }
                return next();
            }
        }
    });
    gulp.watch(['app/**/*.html', 'app/index.html', 'app/**/*.css', 'app/**/*.js'], ['build', browserSync.reload]);
});

gulp.task('default', ['build', 'serve']);
