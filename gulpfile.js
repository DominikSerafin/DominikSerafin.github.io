'use strict';




/*------------------------------------*\
  plugins
\*------------------------------------*/

var gulp          = require('gulp');
var source        = require('vinyl-source-stream');
var buffer        = require('vinyl-buffer');
var watchify      = require('watchify');
var assign        = require('lodash.assign');
var browserify    = require('browserify');
var browserSync   = require('browser-sync');
var gutil         = require('gulp-util');
var notify        = require('gulp-notify');
var plumber       = require('gulp-plumber');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var uglify        = require('gulp-uglify');
var sourcemaps    = require('gulp-sourcemaps');





/*------------------------------------*\
  table of contents
\*------------------------------------*/
/*

  configuration _____ config variables for tasks

  jsbuild ___________ browserify and uglify script
  cssbuild __________ sass, autoprefixer and browsersync css inject

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
    baseDir: 'src',
    directory: true
  },
  open: false,
  ui: false,
  ghostMode: false,
  notify: false
};

var js = {
  src: ['src/static/js-source/index.js'],
  dest: 'src/static/js',
  name: 'bundle.js'
};

var css = {
  src: ['src/static/css-source/global.scss'],
  dest: 'src/static/css'
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
  jsbuild
\*------------------------------------*/

// add custom browserify options here
var customOpts = {
  entries: js.src,
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('jsbuild', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(js.name))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(js.dest));
}



/*------------------------------------*\
  cssbuild
\*------------------------------------*/
gulp.task('cssbuild', function() {

  //src
  return gulp.src(css.src)

  //plumber
  .pipe(plumber({errorHandler: function(error) {
    notify.onError({
      title:    'build failed',
      message:  'cssbuild: <%= error.message %>'
    })(error);
    this.emit('end');
  }}))

  .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass(sassconfig))
    .pipe(autoprefixer(autoprefixerconfig))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(css.dest))
  .pipe(browserSync.reload({stream: true}));

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
  gulp.watch('src/static/css-source/**/*',       ['cssbuild']);
  gulp.watch('src/static/js-source/**/*.js',     ['jsbuild']);
  //reload
  //gulp.watch('src/templates/**/*.html',          ['reload']);
  //gulp.watch('src/static/js/**/*',               ['reload']);

});


/*------------------------------------*\
  default
\*------------------------------------*/
gulp.task('default', ['server', 'watch']);

