let gulp = require('gulp');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let sourcemaps = require('gulp-sourcemaps');
let browserSync = require('browser-sync').create();

function csstyle(done){
    gulp.src('./sass/**/*.sass')
        .pipe( sourcemaps.init() )
        .pipe( sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }) )
        .on('error', console.error.bind(console))
        .pipe( autoprefixer({
            overrideBrowserslist: ['last 6 versions'],
            cascade: false
        }) )
        .pipe( rename({suffix: '.min'}) )
        .pipe( sourcemaps.write('./') )
        .pipe(gulp.dest('./css/'))
        .pipe( browserSync.stream() );
    done();
}

function sync(done){
    browserSync.init({
        server: {
            baseDir: './',
            port: 3000
        }
    });
    done();
}

function reload(done){
    browserSync.reload();
    done();
}
function watchFiles(){
    gulp.watch('./sass/**/*', csstyle);
    gulp.watch('./**/*.html', reload);
    gulp.watch('./**/*.js', reload);
    gulp.watch('./**/*.php', reload);
}

// gulp.task(csstyle);
// exports.sasstask = sasstask;

gulp.task('default', gulp.parallel(watchFiles, sync));