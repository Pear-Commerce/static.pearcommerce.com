const gulp = require('gulp');
const cp = require('child_process');
const revision = cp.execSync('git rev-parse --short HEAD').toString().trim();
const revisionDetails = cp.execSync('git log -n 1 HEAD').toString().trim();
const fileinclude = require('gulp-file-include');

gulp.task('fileinclude', function() {
    return gulp.src(['./static/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './static/'
        })).on('error', console.log)
        .pipe(gulp.dest('./dist/'));
});

const CONFIGS = {
    development: {
        bucket: 'static.pearcommerce.com',
        slack: false
    },
    production: {
        bucket: 'static.pearcommerce.com',
        slack: false
    }
};

const config = require('./pear-scripts/configuration.js')(null, null, CONFIGS, null);

gulp.task('deploy', ['fileinclude'], function(callback) {
    require('./pear-scripts/s3-cloudfront-deploy.js')({
        config: config,
        cachedSources: ['./dist/**/*', './static/**/*', '!./static/*.html'],
        uncachedSources: [],
        revision: revision,
        revisionDetails: revisionDetails,
        waitForCloudfrontInvalidation: false,
    }, callback);
});
