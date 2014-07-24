/* Created by frank on 14-7-24. */
/*jshint node:true, strict:false, asi: true*/
var gulp = require('gulp')
var jade = require('gulp-jade');
var chalk = require('chalk')
var clean = require('gulp-clean')
var ignore = require('gulp-ignore')
var changed = require('gulp-changed')


var myPaths = {
    src: './src/',
    dist: './dist/',
    jade: './src/*.jade',
    copy: './src/static/**',
}

gulp.task('clean', function (done) {
    gulp.src(myPaths.dist + '**/*.*', {read: false})
        .pipe(clean())
    done()
});

gulp.task('jade2html', function () {
    gulp.src(myPaths.jade)
        .pipe(changed(myPaths.dist))
        .pipe(jade())
        .pipe(gulp.dest(myPaths.dist))
});
gulp.task('copy', function () {
    gulp.src(myPaths.copy, {base: myPaths.src})
        .pipe(changed(myPaths.dist))
        .pipe(gulp.dest(myPaths.dist))
});

gulp.task('watch', function () {
    gulp.watch([myPaths.copy], ['copy'])
    gulp.watch([myPaths.jade], ['jade2html'])
});

gulp.task('debug', ['clean', 'copy', 'jade2html', 'watch'], function () {
    console.info(chalk.black.bgWhite.bold('You can debug now!'))
})

gulp.task('build', [], function () {
    console.info(chalk.black.bgWhite.bold('Building tasks done!'))
})
