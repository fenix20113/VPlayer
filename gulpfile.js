var gulp = require('gulp'),
    path = require('path'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css');

var sourcePath = {
    scss: ['./scss/main.scss'],
    js: ['./js/**/*.js']
};

gulp.task('default', ['styles', 'scripts']);

gulp.task('styles', function () {
    gulp.src(sourcePath.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'));
        //.pipe(rename({suffix: '.min'}))
        //.pipe(minifycss())
        //.pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function (){
    gulp.src(sourcePath.js)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', function () {
    gulp.watch(sourcePath.scss, ['styles']);
    gulp.watch(sourcePath.js, ['scripts']);
});
