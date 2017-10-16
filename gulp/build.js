import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';

let stripDirectory = (path) => {
    path.dirname = '';
}

gulp.task('build_dist', ['build_js_dist']);

gulp.task('build_js_dist', () => {
    return browserify('./src/js/index.js')
        .transform(babelify)
        .bundle()
        .pipe(source('./src/js/index.js'))
        .pipe(buffer())
        .pipe(rename(stripDirectory))
        .pipe(gulp.dest('./dist'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});
