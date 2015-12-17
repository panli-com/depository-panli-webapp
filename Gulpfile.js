/**
 * Created by Administrator on 2015/9/11.
 */
// 引入 gulp
var gulp = require('gulp');


// 引入组件
//var jshint = require('gulp-jshint');
var sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserify = require('gulp-browserify'),
    notify = require('gulp-notify'),
    jshint = require('gulp-jshint'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    port = process.env.port || 5000;


var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;



// live reload
gulp.task('connect',function(){
    connect.server({
        // root:'./',
        port: port,
        livereload: true,
    })
})

// reload Js
gulp.task('js',function(){
    gulp.src('./build/webapp/**/*.js')
        .pipe( connect.reload() )
})


// reload Js
gulp.task('js',function(){
    gulp.src('./build/webapp/**/js/*.js')
        .pipe( connect.reload() )
        .pipe(notify({ message: 'reload Js Ok' }));
})
//编译Sass，Autoprefix及缩小化
gulp.task('sass', function() {
    return gulp.src('./src/webapp/common/scss/panli.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('build/webapp/common/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('build/webapp/common/js/skin'))
        .pipe( connect.reload() )
        .pipe(notify({ message: 'Styles Common task complete' }));

});



gulp.task('scripts', function() {
     gulp.src('./src/webapp/common/js/*.js')
        .pipe(concat('panli.js'))
        .pipe(gulp.dest('build/webapp/common/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/webapp/common/js'))
        .pipe(notify({ message: 'Scripts common task complete' }));


});






/* 监听 */

gulp.task('watch', function() {

    // 看守所有.scss档
    gulp.watch('src/webapp/common/scss/*.scss', ['sass']);


    // 看守所有.组件
    gulp.watch('src/webapp/common/js/*.js', ['scripts']);


    // 看守所有.html
    gulp.watch('./*.html').on('change', reload);

});



// 静态服务器 + 监听 scss/html 文件
gulp.task('dev', ['sass'], function() {

    browserSync.init({
        server: './'
    });

    // 看守.scss 档

    gulp.watch('src/webapp/common/scss/*.scss', ['sass']);

    // 看守所有.js档
    gulp.watch('src/webapp/common/js/*.js', ['scripts']);


    // 看守所有.html
    gulp.watch('./*.html').on('change', reload);;


});


gulp.task('default', ['dev']);

gulp.task('serve',['connect','watch']);
