let gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');
    // cssmin = require('gulp-cssmin');

gulp.task('sass', function(){
    return gulp.src('docs/scss/**/*.scss')
            .pipe(sass({outputStyle: 'compressed'}))  // expanded
            .pipe(rename({suffix: '.min'}))
            .pipe(autoprefixer({
                browsers: ['last 8 versions']
            }))
            .pipe(gulp.dest('docs/css'))
            .pipe(browserSync.reload({stream: true}))
});

    //  используется пока нет плагина gulp-cssmin
    // .pipe(concat('libs.css'))
    // .pipe(cssmin())    если используется плагин cssmin
    // .pipe(gulp.dest('docs/css'))

gulp.task('style', function(){
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/magnific-popup/dist/magnific-popup.css',
        'node_modules/rateyo/src/jquery.rateyo.css',              
        'node_modules/ion-rangeslider/css/ion.rangeSlider.css',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css',             
        'node_modules/jquery-form-styler/dist/jquery.formstyler.css',             
        'node_modules/jquery-form-styler/dist/jquery.formstyler.theme.css',             
        'node_modules/animate.css/animate.css',             
    ])
        .pipe(concat('libs.css'))
        .pipe(gulp.dest('docs/css'))
});

gulp.task('script', function(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        'node_modules/mixitup/dist/mixitup.js',
        'node_modules/rateyo/src/jquery.rateyo.js',
        'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
        'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
        'node_modules/wow.js/dist/wow.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('docs/js'))
});

gulp.task('html', function(){
    return gulp.src('docs/*.html')
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
    return gulp.src('docs/js/*.js')
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
    browserSync.init({
        server: {
            baseDir: "docs/"
        }
    });
});

gulp.task('watch', function(){
    gulp.watch('docs/scss/**/*.scss', gulp.parallel('sass'))
    gulp.watch('docs/*.html', gulp.parallel('html'))
    gulp.watch('docs/js/*.js', gulp.parallel('js'))
});

gulp.task('default', gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync'));