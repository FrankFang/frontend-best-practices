/* Created by frank on 14-7-24. */
/*jshint node:true, strict:false, asi: true*/
var gulp = require('gulp')
var jade = require('gulp-jade');


var myPaths = {
    jade: './src/*.jade',
    dist: './dist/'
}

gulp.task('html', function () {
    gulp.src(myPaths.jade)
        .pipe(jade())
        .pipe(gulp.dest(myPaths.dist))
});
