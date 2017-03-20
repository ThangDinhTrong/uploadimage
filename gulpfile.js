var gulp = require('gulp');
var imagemin = require('gulp-imagemin'),browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('imagemin', function () {
    return gulp.src('./public/images/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('imagemin-img'));
});

gulp.task('serve', [], function () {
    browserSync({
        notify: false,
        server: {
            baseDir: '.'
        }
    });
 
    gulp.watch(['*.html'], reload);
    gulp.watch(['js/*.js'], reload);
});