const gulp = require('gulp');
const del = require('del');
const babel = require('gulp-babel');

const package = require('./package.json');
const config = require('./conf/gulp.conf');


/**
 * Clean up by deleting old files
 */
gulp.task('clean', () => {
  del.sync([ config.paths.dist ]);
});


/**
 * Compile JS into one JS file suitable to run on browser
 */
gulp.task('build:js', () => {
  return gulp.src(config.paths.main + '/**/*.js')
             .pipe(babel())
             .pipe(gulp.dest(config.paths.dist));
});

/**
 * Build both
 */
gulp.task('build', [ 'build:js' ] );


/**
 * Default
 */
gulp.task('default', [ 'clean', 'build' ]);
