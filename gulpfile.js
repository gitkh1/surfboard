const { src, dest, task, series, watch, parallel } = require('gulp');
const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS, SVG_FILTER} = require('./gulp.config');
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('node-sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
const filter = require('gulp-filter');

const env = process.env.NODE_ENV;

sass.compiler = require('node-sass');

task('clean', () => {
    return src(`${DIST_PATH}/**/*`, { read: false })
        .pipe(rm());
});

task('copy:html', () => {
    return src(`${SRC_PATH}/*.html`)
        .pipe(dest(DIST_PATH))
        .pipe(reload({ stream: true }));
});

task('copy:img-content', () => {
    return src([`${SRC_PATH}/img/content/*.jpg`,`${SRC_PATH}/img/content/*.jpeg`,`${SRC_PATH}/img/content/*.png`, `${SRC_PATH}/img/content/*.svg`])
        .pipe(dest(`${DIST_PATH}/img/content`))
        .pipe(reload({ stream: true }));
});

task('copy:video', () => {
    return src([`${SRC_PATH}/video/**/*.*`])
        .pipe(dest(`${DIST_PATH}/video`))
        .pipe(reload({ stream: true }));
});


task('copy:jsLibs', () => {
    return src([...JS_LIBS])
        .pipe(dest(`${DIST_PATH}/js`))
        .pipe(reload({ stream: true }));
});

task('styles', () => {
    return src([...STYLE_LIBS,'src/styles/main.scss'])
        .pipe(concat('main.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(gulpif(env === 'prod', gcmq()))
        .pipe(gulpif(env === 'prod', cleanCSS({ compatibility: 'ie8' })))
        .pipe(dest(`${DIST_PATH}/css`))
        .pipe(reload({ stream: true }));
});

const scripts = [
    'src/scripts/document.ready/before.js',
    'src/scripts/*.js',
    'src/scripts/document.ready/after.js'
];

task('scripts', () => {
    return src(scripts)
        .pipe(concat('script.js'))
        .pipe(gulpif(env === 'prod', babel({ presets: ['@babel/env'] })))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(dest(`${DIST_PATH}/js`))
        .pipe(reload({ stream: true }));
});

task('icons', () => {
    const logoFilter = filter(['**',...SVG_FILTER], {restore: true});
    return src(`${SRC_PATH}/img/icons/*.svg`)
        .pipe(logoFilter)
        .pipe(svgo({
            plugins: [
                {
                    removeAttrs: {
                        attrs: '(fill|stroke|width|height.*)'
                    }
                }
            ]
        }))
        .pipe(logoFilter.restore)
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest(`${DIST_PATH}/img/icons`));
});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});

task('watch', () => {
    watch('./src/styles/**/*.scss', series('styles'));
    watch('./src/*.html', series('copy:html'));
    watch('./src/img/content/*.jpg', series('copy:img-content'));
    watch('./src/scripts/**/*.js', series('scripts'));
    watch('./src/images/icons/*.svg', series('icons'));
});

task('default', series(parallel('copy:html', 'copy:img-content', 'copy:video', 'styles', 'copy:jsLibs', 'scripts'), parallel('server', 'watch')));
task('prod', series('clean', parallel('copy:html', 'copy:img-content', 'copy:video', 'styles', 'copy:jsLibs', 'scripts', 'icons')));