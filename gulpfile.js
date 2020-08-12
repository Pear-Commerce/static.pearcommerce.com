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

gulp.task('copy-app', ['copy-app-top-level', 'copy-app-static']);

gulp.task('copy-app-top-level', function() {
  return gulp.src(['./static/index.html'])
      .pipe(browserify({
        transform: ['brfs'],
      }))
      .pipe(fileinclude({
        prefix: '@@',
        basepath: './static/',
      })).on('error', console.log)
      .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-app-static', function() {
  return gulp.src(['./static/**/*', '!./static/wp-*/**/*', '!./static/*.html', '!./static/js/index.js'])
      .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-wp-content', function() {
  return gulp.src(['./static/wp-*/**/*'])
      .pipe(gulp.dest('./dist/'));
});


gulp.task('bundle-scripts', function() {
  const task = gulp.src(['./static/js/index.js'])
      .pipe(browserify({
        debug: true,
        transform: ['brfs'],
      }))
      .pipe(replace('$$CONFIG$$', JSON.stringify(config)));

  return task.pipe(gulp.dest('dist/js/bundle.js'));
});


gulp.task('build', ['copy-app', 'bundle-scripts']);
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


gulp.task('start-server', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: './dist',
      middleware: function(req, res, next) {
        let fileName = url.parse(req.url);

        fileName = fileName.href.split(fileName.search).join(''),
        fileExt = path.extname(fileName);

        const fileExists = fs.existsSync(__dirname + '/dist/' + fileName);
        if (!fileExists && fileName.indexOf('browser-sync') < 0 && ['', '.html'].indexOf(fileExt) >= 0) {
          req.url = '/index.html';
        }
        return next();
      },
    },
    port: 8002,
    startPath: '/',
  });
});

gulp.task('serve', ['build-full', 'start-server', 'watch']);


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

gulp.task('move-index-preprocessing', function() {
  return gulp.src(['./static/js/index-2.js'])
      .pipe(gulp.dest('./dist/js/pre/'));
});

gulp.task('vue-1', ['move-index-preprocessing', 'rename-vue-components'], function() {
  return gulp.src(['./dist/**/*.vue'])
      .pipe(vueify({}))
      .on('error', console.log)
      .pipe(gulp.dest('./dist/'));
});


gulp.task('bundle-index-2', ['vue-1'], function() {
  return gulp.src(['./dist/js/pre/index-2.js'])
      .pipe(browserify({
      }))
      .pipe(gulp.dest('./dist/js/'));
});

gulp.task('vue-index-html', [], function() {
  return gulp.src(['./static/html/index-2.html'])
      .pipe(gulp.dest('./dist/'));
});


gulp.task('serve-vue-1', ['vue-index-html', 'bundle-index-2'], function() {
  browserSync.init({
    server: {
      baseDir: './dist',
      middleware: function(req, res, next) {
        let fileName = url.parse(req.url);

        fileName = fileName.href.split(fileName.search).join(''),
        fileExt = path.extname(fileName);

        const fileExists = fs.existsSync(__dirname + '/dist/' + fileName);
        if (!fileExists && fileName.indexOf('browser-sync') < 0 && ['', '.html'].indexOf(fileExt) >= 0) {
          req.url = '/index-2.html';
        }
        return next();
      },
    },
    port: 8003,
    startPath: '/',
  });
});
