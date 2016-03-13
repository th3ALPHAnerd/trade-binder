var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var Server = require('karma').Server;
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var bower = require('gulp-bower');
var watch = require('gulp-watch');
var uncss = require('gulp-uncss');
var csslint = require('gulp-csslint');
var cssmin = require('gulp-cssmin');
var runSequence = require('run-sequence');

//css lint
gulp.task('csslint', function () {
    gulp.src('public/app/assets/libs/bootstrap/dist/css/*.css')
            .pipe(csslint())
            .pipe(csslint.reporter());
});

//Gets the fonts from Font-Awesome and puts them in the dist folder
gulp.task('fontAwesome', ['clean:fonts'], function () {
    return gulp.src([
        'public/assets/libs/font-awesome/fonts/FontAwesome.otf',
        'public/assets/libs/font-awesome/fonts/fontawesome-webfont.eot',
        'public/assets/libs/font-awesome/fonts/fontawesome-webfont',
        'public/assets/libs/font-awesome/fonts/fontawesome-webfont.ttf',
        'public/assets/libs/font-awesome/fonts/fontawesome-webfont.woff',
        'public/assets/libs/font-awesome/fonts/fontawesome-webfont.woff2'
    ])
            .pipe(rename({
                dirname: '/fonts'
            }))
            .pipe(gulp.dest('public'));
});

//removes unsed css, concats and minifies the used css files and places it in the dist folder
gulp.task('css', ['fontAwesome'], function () {
    gulp.src([
        'public/assets/libs/bootstrap/dist/css/bootstrap.css',
        'public/assets/css/app.css',
        'public/assets/libs/bootstrap/dist/css/bootstrap-theme.css',
        'public/assets/libs/font-awesome/css/font-awesome.css'
    ])
            .pipe(uncss({
                ignore: [
                    '.active',
                    '.fade',
                    '.fade.in',
                    '.collapse',
                    'collapse.in',
                    '.collapsing',
                    '.popover',
                    /\.open/],
                html: [
                    'public/*.html',
                    'public/app/**.*html',
                    'public/app/**/**.*html',
                    '!public/assets/libs/**.*html'
                ]
            }))
            .pipe(concat('single.css'))
            .pipe(cssmin())
            .pipe(rename('app.min.css'))
            .pipe(gulp.dest('public/dist'));

});

//looks for changes in js and css files and rebuilds the items in the dist folder
gulp.task('watch', function(){
    gulp.watch([
        'public/app/**/*.js',
        'public/app.js',
        'public/appController.js',
        'public/appConfig.js',
        'public/assets/css/*.css'
    ],[
        'scripts', 
        'css']);
});

//watchs for change in js files and rebuilds app.min.js
gulp.task('watchScripts', function () {
    gulp.watch([
        'public/app/**/*.js',
        'public/app.js',
        'public/appController.js',
        'public/appConfig.js'
    ], ['scripts']);
});

//same as bower install
gulp.task('bower', function (cb) {
    return bower(cb);
});

//Clean js in dist folder
gulp.task('cleanJs', function (cb) {
    return del([
        'public/dist/**.js',
        'public/dist/**.map',
        '!public/dist'

    ], cb);
});

//Clean js in dist folder
gulp.task('cleanCss', function (cb) {
    return del([
        'public/dist/**.css',
        '!public/dist'
    ], cb);
});

//Clean dist folder
gulp.task('clean:dist', function (cb) {
    return del(['public/dist/**', '!public/dist'], cb);
});

//Clean fonts folder
gulp.task('clean:fonts', function (cb){
    return del(['public/fonts/**'], cb);
});

/**
 * Run test once and exit
 */
gulp.task('test', function (cb) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, cb).start();
});

//Js lint
gulp.task('lint', function () {
    return gulp.src([
        'public/app/**/*.js',
        'public/app.js',
        'public/appController.js',
        'public/appConfig.js'
    ])
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src(
            [
                'public/app.js',
                'public/appController.js',
                'public/appConfig.js',
                '!public/**/*.spec.js',
                'public/app/**/*.js'
            ])
            .pipe(sourcemaps.init())
            .pipe(concat('single.js'))
            .pipe(rename('app.min.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write('/'))
            .pipe(gulp.dest('public/dist'));

});

//Default Task
gulp.task('default', ['lint', 'csslint', 'scripts', 'css', 'test']);

//get/generates all the front end needs
gulp.task('build', function (cb) {
    runSequence('bower',
            'clean:dist',
            ['scripts', 'css'],
            cb);
});