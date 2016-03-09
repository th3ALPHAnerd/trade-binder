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
var checkCSS = require('gulp-check-unused-css');


gulp.task('csslint', function () {
    gulp.src('public/app/assets/libs/bootstrap/dist/css/*.css')
            .pipe(csslint())
            .pipe(csslint.reporter());
});

gulp.task('unUsedCss', function () {
    gulp.src([
        'public/assets/libs/bootstrap/dist/css/bootstrap.css',
        'public/assets/libs/bootstrap/dist/css/bootstrap-theme.css'        
    ], [
        'public/*.html',
        'public/app/**.*html',
        'public/app/**/**.*html'
    ]).pipe(checkCSS({
        ignore:['.nav', '.navbar']
    }))
            .pipe(gulp.dest('public/dist'));
});

gulp.task('unCSS', function () {
    gulp.src([
        'public/assets/libs/bootstrap/dist/css/bootstrap.css',
        'public/assets/libs/bootstrap/dist/css/bootstrap-theme.css'
    ])
            .pipe(uncss({
                ignore: [
           // 'nav', 
           // 'navbar',
           // '*active',
           // 'dropdown*',
            '.fade', 
            '.fade.in', 
            '.collapse', 
            'collapse.in', 
            '.collapsing', 
            /\.open/],
                html: [
                    'public/*.html',
                    'public/app/**.*html',
                    'public/app/**/**.*html',
                    '!public/assets/libs/**.*html'
                ]
            }))
            .pipe(gulp.dest('public/dist'));

});



gulp.task('watchScripts', function () {
    gulp.watch([
        'public/app/**/*.js',
        'public/app.js',
        'public/appController.js',
        'public/appConfig.js'
    ], ['scripts']);
});

gulp.task('bower', function () {
    return bower();
});

//Clean js in dist folder
gulp.task('cleanJs', function (cb) {
    return del([
        'public/dist/**.js',
        'public/dist/**.map',
        '!public/dist'

    ], cb);
});


//Clean dist folder
gulp.task('clean:dist', function (cb) {
    return del(['public/dist/**', '!public/dist'], cb);
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

// Lint Task
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
gulp.task('default', ['lint', 'scripts', 'test']);