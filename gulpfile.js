
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var Server = require('karma').Server;
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var bower = require('gulp-bower');
//var unique = require('uniq')


gulp.task('bower', function(){
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

//Clean html

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
    'public/appController.js'
      ])
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', ['moveJs'],function(){
 return gulp.src(
            [
             'public/app.js',
             'public/appController.js',
	     '!public/appConfig.js',
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

gulp.task('moveJs', ['cleanJs'], function () {
    return gulp.src(
            [
	      'public/appConfig.js',

            ])
            .pipe(concat('all.js'))

            .pipe(gulp.dest('public/dist'));
});

//Default Task
gulp.task('default', ['lint', 'scripts', 'test']);