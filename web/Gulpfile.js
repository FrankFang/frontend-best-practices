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
var newer = require('gulp-newer')
var less = require('gulp-less')
var prefix = require('gulp-autoprefixer')


var myPaths = {
    src: './src/',
    dist: './dist/',
    html: './src/{,masters/}*.html',
    copy: ['./src/static/*', '!./src/static/stylesheets/'],
    less: './src/static/**/*.less',
    css: './src/static/**/*.css'
}

gulp.task('clean', function () {
    gulp.src(myPaths.dist)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(rimraf({force: false, verbose: true}))
})

gulp.task('less2css', function () {
    gulp.src(myPaths.css)
        .pipe(prefix('last 1 version', '> 1%', 'ie 8'))
        .pipe(gulp.dest(myPaths.dist + 'static/'))
    gulp.src(myPaths.less)
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(prefix('last 1 version', '> 1%', 'ie 8'))
        .pipe(gulp.dest(myPaths.dist + 'static/'))
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
    gulp.watch(myPaths.less, ['less2css'])
    gulp.watch(myPaths.html, ['html-extend'])


})

gulp.task('debug', [ 'copy', 'less2css', 'html-extend', 'watch'], function () {
    console.info(chalk.black.bgWhite.bold('You can debug now!'))
})

gulp.task('build', [], function () {
    console.info(chalk.black.bgWhite.bold('Building tasks done!'))
})
