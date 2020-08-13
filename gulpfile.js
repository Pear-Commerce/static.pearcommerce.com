const cp = require('child_process');
const gulp = require('gulp');
const revision = cp.execSync('git rev-parse --short HEAD').toString().trim();
const revisionDetails = cp.execSync('git log -n 1 HEAD').toString().trim();
const browserify = require('gulp-browserify');
const browserSync = require('browser-sync').create();
const buffer = require('vinyl-buffer');
const fileinclude = require('gulp-file-include');
const fs = require('fs');
const path = require('path');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const url = require('url');
const vueify = require('gulp-vueify');
const cssnext = require('cssnext');

const CONFIGS = {
  development: {
    bucket: 'static.pearcommerce.com',
    slack: false,
  },
  production: {
    bucket: 'static.pearcommerce.com',
    slack: false,
  },
};

const config = require('./pear-scripts/configuration.js')(null, null, CONFIGS, null);

gulp.task('copy-app-static', function() {
  return gulp.src(['./static/**/*', '!./static/wp-*/**/*', '!./static/js/index.js'])
      .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-wp-content', function() {
  return gulp.src(['./static/wp-*/**/*'])
      .pipe(gulp.dest('./dist/'));
});


gulp.task('build', ['copy-app-staticwwww', 'bundle-scripts']);
gulp.task('build-full', ['copy-app', 'copy-wp-content', 'bundle-scripts']);

gulp.task('deploy', ['build-full'], function(callback) {
  require('./pear-scripts/s3-cloudfront-deploy.js')({
    config: config,
    cachedSources: ['./dist/**/*', './static/**/*', '!./static/*.html'],
    uncachedSources: [],
    revision: revision,
    revisionDetails: revisionDetails,
    waitForCloudfrontInvalidation: false,
  }, callback);
});

gulp.task('watch', function() {
  // Watch app files
  gulp.watch(['./static/*.html'], ['copy-app-top-level']);
  gulp.watch(['./static/**/*', '!./static/wp-*/**/*', '!./static/*.html', '!./static/js/index.js'], ['copy-app-static']);
  // watch wp-content
  gulp.watch('./static/wp-*/**/*', ['copy-wp-content']);
  // Watch .js files
  gulp.watch(['./static/**/*.js', '!./static/wp-*/**/*'], ['bundle-scripts', browserSync.reload]);
});


gulp.task('rename-vue-components', function() {
  return gulp.src('./static/html/components/**/*')
      .pipe(rename(function(path) {
        path.extname = '.vue';
      }))
      .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-vue-components', function() {
  return gulp.src(['./static/components/**/*.vue', './static/components/**/*.html'])
      .pipe(vueify({postcss: [cssnext()]}))
      .on('error', console.log)
      .pipe(gulp.dest('./dist/components'));
});


gulp.task('bundle-index-js', ['compile-vue-components'], function() {
  return gulp.src(['./static/js/index*.js'])
      .pipe(browserify({
        paths: ['./node_modules', './static/js', './dist/components/'],
        transform: ['brfs'],
      }))
      .pipe(replace('$$CONFIG$$', JSON.stringify(config)))
      .pipe(gulp.dest('./dist/js/'));
});


gulp.task('serve', ['bundle-index-js', 'copy-app-static'], function() {
  browserSync.init({
    server: {
      baseDir: './dist',
      middleware: function(req, res, next) {
        let fileName = url.parse(req.url);

        fileName = fileName.href.split(fileName.search).join('');
        const fileExt = path.extname(fileName);

        const fullFilePath = __dirname + '/dist/' + fileName;
        const fileExists = fs.existsSync(fullFilePath) && fs.lstatSync(fullFilePath).isFile();
        if (!fileExists && fileName.indexOf('browser-sync') < 0 && ['', '.html'].indexOf(fileExt) >= 0) {
          req.url = '/html/index.html';
        }
        console.log(__dirname + '/dist/' + fileName + ' ' + fileExists, req.url);
        return next();
      },
    },
    port: 8003,
    startPath: '/',
  });
});
