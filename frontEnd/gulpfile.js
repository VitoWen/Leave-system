var gulp = require('gulp'),
    clean = require('gulp-clean'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    fontgen = require('gulp-fontgen'),
    uglify = require("gulp-uglify"),
    concat = require('gulp-concat'),
    minifyCss = require ('gulp-minify-css'),
    browserSync = require('browser-sync'),
    htmlreplace = require('gulp-html-replace'),
    minifyHTML  = require('gulp-minify-html'),
    rename  = require('gulp-rename');

gulp.task('default',['bs']);

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('bs', ['html', 'watch'], function () {
    var opts = {
        server: 'dist'
    };
    
    browserSync.init(opts);
});

gulp.task('watch', function () {
    gulp.watch(['src/app/**/*.html'],['html']);  
    gulp.watch(['src/assets/**/*.scss'],['sass']);  
    gulp.watch(['src/app/**/*.js'],['appJs']);
});

gulp.task('html', ['sass', 'fontgen', 'appJs', 'libJs'], function() {
    var replaceOpts = {
            'css': 'scss/l.css',
            'js': ['js/lib.js', 'js/l.js']
        },
        miniOpts = {
            removeComments: true,
            removeEmptyAttributes: true,
            spare: false,
            quotes: true
        };

    gulp.src('src/app/views/index.html')
        .pipe(htmlreplace(replaceOpts))
        .pipe(minifyHTML(miniOpts))
        .pipe(gulp.dest('./dist'));

    return gulp.src('src/app/**/*.html')
        .pipe(minifyHTML(miniOpts))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass', ['fontgen', 'images'], function () {
    var opts = {
        outputStyle: 'compressed',
        style: 'expanded'
    };

    return gulp.src(['src/assets/**/*.scss', 'dist/scss/FontAwesome.css', 'thirdParty/**/*.css'])  
        .pipe(concat('l.scss'))
        .pipe(sass(opts))
        .pipe(minifyCss()) 
        .pipe(gulp.dest('./dist/scss'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('fontgen', function () {
    return gulp.src("src/assets/fonts/*.{ttf,otf}")
        .pipe(fontgen({
            dest: "dist/scss"
        }));
});

gulp.task('images', function () {
    return gulp.src("thirdParty/jqueryUI/images/*")
        .pipe(gulp.dest('./dist/scss/images'));
});

gulp.task('libJs',  function () {
    return gulp.src([
            'node_modules/jquery/dist/jquery.min.js', 
            'node_modules/jquery-serializejson/jquery.serializejson.min.js', 
            'node_modules/angular/angular.min.js',
            'node_modules/angular-ui-router/release/angular-ui-router.min.js',
            'thirdParty/uikit/*.js',
            'thirdParty/jqueryUI/*.js',
            'thirdParty/jqueryUITimepicker/*.js',
            ])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('appJs', ['jshint'], function () {
    return gulp.src(['src/app/controllers/app.js', 'src/app/**/*.js'])
        .pipe(concat('l.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('jshint', function () {
    return gulp.src('src/app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


