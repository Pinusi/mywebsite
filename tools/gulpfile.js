/*
  VARIABLES
*/

var folders = {
  build: '../dist',
  src: '../src',
  temp: '.tmp',
  test: '../spec'
};

var css_to_minify = [
  folders.temp + '/{,*/}*.css',
  folders.src + '/vendor/normalize.css/normalize.css'
];

/*
  MODULES
*/

var gulp = require('gulp');
var Q = require('q');
var sass = require('gulp-ruby-sass');
var minifycss = require('gulp-minify-css');
var notify = require('gulp-notify');
var del = require('del');
var es = require('event-stream');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var rjs = require('gulp-requirejs');
var manifest = require('gulp-manifest');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch(folders.src + '/sass/{,*/}*.scss', ['styles']);

  // Watch .scss files
  gulp.watch('gulpfile.js', ['build']);

  // Watch .js files
  gulp.watch([
    folders.src + '/app/js/{,*/}*.js',
    folders.src + '/app/templates/{,*/,**/}*.html'], ['scripts', 'test']);

  //Watch image files
  gulp.watch(folders.src + '/assets/images/{,*/}*.*', ['images']);

  //Watch fonts files
  gulp.watch(folders.src + '/assets/fonts/{,*/}*.*', ['fonts']);

  //Watch api files
  gulp.watch(folders.src + '/api/{,*/}*.*', ['api']);

  //Watch html files
  gulp.watch(folders.src + '/*.html', ['html']);

  //Watch tests files
  gulp.watch(folders.test + '/tests/{,*/}*.js', ['test']);

  // Create LiveReload server
  // livereload.listen();

  // // Watch any files in dist/, reload on change
  // gulp.watch([folders.build + '/**']).on('change', livereload.changed);

});

// Styles
gulp.task('styles', function() {
  var vendorFiles = gulp.src(css_to_minify)
    .pipe(minifycss());
  var appFiles = sass(folders.src + '/sass/main.scss', {style: 'expanded'});

  return es.concat(vendorFiles,appFiles)
    .pipe(concat('main.css'))
    .pipe(minifycss())
    .pipe(gulp.dest(folders.build + '/css/'))
    .pipe(connect.reload())
    .pipe(notify({message: 'Styles task complete'}));
});

gulp.task('scripts', function() {
  return gulp.src(folders.src + '/app/js/none') //hack for requirejs
    .pipe(rjs({
      baseUrl: folders.src + '/app/js/',
      out: 'script.min.js',
      mainConfigFile: folders.src + '/app/js/Main.js',
      include: ['../../vendor/almond/almond', 'Main.js']
    }))
    .pipe(gulp.dest(folders.build + '/js/'))
    .pipe(connect.reload())
    .pipe(notify({message: 'Scripts task complete'}));
});

gulp.task('html', function() {
  return gulp.src(folders.src + '/*.html')
    .pipe(gulp.dest(folders.build + '/'))
    .pipe(connect.reload())
    .pipe(notify({message: 'html task complete'}));
});

gulp.task('api', function() {
  return gulp.src(folders.src + '/api/*.*')
    .pipe(gulp.dest(folders.build + '/api/'))
    .pipe(connect.reload())
    .pipe(notify({message: 'api task complete'}));
});

gulp.task('images', function() {
  return gulp.src(folders.src + '/assets/images/{,*/}*.*')
    .pipe(gulp.dest(folders.build + '/assets/images/'))
    .pipe(connect.reload());
});

gulp.task('favicon', function() {
  return gulp.src(folders.src + '/favicon.ico')
    .pipe(gulp.dest(folders.build))
    .pipe(connect.reload());
});

gulp.task('fonts', function() {
  return gulp.src(folders.src + '/assets/fonts/{,*/}*.*')
    .pipe(gulp.dest(folders.build + '/assets/fonts/'))
    .pipe(connect.reload());
});

gulp.task('compile_tests', function() {
  return gulp.src(folders.test + '/none') //hack for requirejs
    .pipe(rjs({
      baseUrl: '../src/app/js/',
      out: 'test.min.js',
      mainConfigFile: folders.test + '/tests/main.test.js',
      include: ['../../vendor/almond/almond', '../../../spec/tests/main.test.js']
    }))
    .pipe(gulp.dest(folders.test))
    .pipe(notify({message: 'Test task complete'}));
});

gulp.task('test', ['compile_tests'], function() {
  return gulp
    .src(folders.test + '/index.html')
    .pipe(mochaPhantomJS({reporter: 'spec'}));
});

// gulp.task('manifest', function() {
//   var folder = folders.build + '/{,*/,**/}*.*';
//   gulp.src(folder)
//     .pipe(manifest({
//       verbose: true,
//       timestamp: true,
//       network: ['http://*', 'https://*'],
//       fallback: ['/ /offline.html'],
//       hash: true,
//       master: ['index.html'],
//       preferOnline: true,
//       filename: 'app.manifest',
//       exclude: 'app.manifest'
//     }))
//     .pipe(gulp.dest(folders.build));
// });

// Clean
gulp.task('clean', function() {
  return del([
    folders.temp,
    folders.build
  ], {force: true});
});

// Connect
gulp.task('connect', function() {
  connect.server({
    root: folders.build,
    port: 5000,
    livereload: true
  });
});

// Build
gulp.task('build', ['clean'], function() {
  gulp.start('all');
});

gulp.task('all', ['styles', 'scripts','html', 'api', 'fonts', 'images', 'favicon'], function() {
  // gulp.start('manifest');
  gulp.start('test');
});

// DEFAULT
gulp.task('default', ['watch', 'connect'], function() {
  gulp.start('build');
});
