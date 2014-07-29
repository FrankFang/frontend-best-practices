/* Created by frank on 14-7-24. */
/*jshint node:true, strict:false, asi: true*/
var gulp = require('gulp')
var chalk = require('chalk')
var ignore = require('gulp-ignore')
var changed = require('gulp-changed')
var cache = require('gulp-cached')
var remember = require('gulp-remember')
var pkg = require('./package.json')
var include = require('gulp-file-include')
var extender = require('gulp-html-extend')
var rimraf = require('gulp-rimraf')
var plumber = require('gulp-plumber')
var notify = require('gulp-notify')


var myPaths = {
    src: './src/',
    dist: './dist/',
    html: './src/{,masters/}*.html',
    copy: './src/static/**',
}

gulp.task('clean', function () {
    return gulp.src(myPaths.dist + '**/*')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(rimraf())
})

gulp.task('html-include', function () {
    gulp.src(myPaths.html)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(include())
        .pipe(gulp.dest(myPaths.dist))
})

gulp.task('html-extend', function () {
    gulp.src(myPaths.html)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(extender())
        .pipe(gulp.dest(myPaths.dist))
})

gulp.task('copy', function () {
    return gulp.src(myPaths.copy, {base: myPaths.src})
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(changed(myPaths.dist))
        .pipe(gulp.dest(myPaths.dist))
})

gulp.task('watch', function () {
    gulp.watch(myPaths.copy, ['copy'])

    var watcher = gulp.watch(myPaths.html, ['html-extend'])


})

gulp.task('debug', ['copy', 'html-extend', 'watch'], function () {
    console.info(chalk.black.bgWhite.bold('You can debug now!'))
})

gulp.task('build', [], function () {
    console.info(chalk.black.bgWhite.bold('Building tasks done!'))
})
