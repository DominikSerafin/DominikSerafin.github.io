'use strict';




/*------------------------------------*\
  plugins
\*------------------------------------*/

var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var notify        = require('gulp-notify');
var plumber       = require('gulp-plumber');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');
var sourcemaps    = require('gulp-sourcemaps');





/*------------------------------------*\
  table of contents
\*------------------------------------*/
/*

  configuration _____ config variables for tasks

  cssbuild __________ sass, autoprefixer and browsersync css inject
  jsbuild ___________

  server ____________ runs browsersync server
  reload ____________ (helper task) reload
  watch _____________ watches files and then builds and reloads
  default ___________ runs [server, watch]

*/





/*------------------------------------*\
  configuration
\*------------------------------------*/

var serverconfig = {
  server: {
    baseDir: './',
    directory: false
  },
  open: false,
  ui: false,
  ghostMode: false,
  notify: false
};



var jsdepssource = './static/js-source/deps/';
var js = {
  dest: './static/js',
  name: 'global.js',

  files: [
    jsdepssource + 'jquery-2.1.4.min.js',
    jsdepssource + 'packery.pkgd.min.js',
    './static/js-source/global.js'
  ]

};




var css = {
  base: './static/css-source',
  src: ['./static/css-source/global.scss'],
  dest: './static/css'
}

var sassconfig = {
  outputStyle: 'compressed',
};

var autoprefixerconfig = {
  cascade: false,
  browsers: [
    '> 0.1%',
    'last 6 versions',
    'last 6 Android versions',
    'last 6 BlackBerry versions',
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ]
};






/*------------------------------------*\
  cssbuild
\*------------------------------------*/
gulp.task('cssbuild', function() {

  //src
  return gulp.src(css.src, {base: css.base})

  //plumber
  .pipe(plumber({errorHandler: function(error) {
    notify.onError({
      title:    'build failed',
      message:  'cssbuild: <%= error.message %>'
    })(error);
    this.emit('end');
  }}))

  .pipe(sourcemaps.init())
    .pipe(sass(sassconfig))
    .pipe(autoprefixer(autoprefixerconfig))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(css.dest));
  //.pipe(browserSync.reload({stream: true}));

});

/*------------------------------------*\
  js build
\*------------------------------------*/

//jsbuild
gulp.task('jsbuild', function() {
  return gulp.src(js.files)

  //plumber
  .pipe(plumber({errorHandler: function(error) {
    notify.onError({
      title:    'build failed',
      message:  'jsbuild: <%= error.message %>'
    })(error);
    this.emit('end');
  }}))

  .pipe(concat(js.name))
  .pipe(uglify())
  .pipe(gulp.dest(js.dest));
});


/*------------------------------------*\
  server
\*------------------------------------*/
gulp.task('server', function() {
  browserSync(serverconfig);
});


/*------------------------------------*\
  server reload
\*------------------------------------*/
gulp.task('reload', browserSync.reload);


/*------------------------------------*\
  watch
\*------------------------------------*/
gulp.task('watch', function() {

  //build
  gulp.watch('static/css-source/**/*.scss',  ['cssbuild']);
  gulp.watch('static/js-source/**/*.js',     ['jsbuild']);

  gulp.watch('static/css/global.css',        ['reload']);
  gulp.watch('static/js/global.js',          ['reload']);

});


/*------------------------------------*\
  default
\*------------------------------------*/
gulp.task('default', ['server', 'watch']);

