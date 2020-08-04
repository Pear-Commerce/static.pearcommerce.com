const gulp = require('gulp');
const cp = require('child_process');
const revision = cp.execSync('git rev-parse --short HEAD').toString().trim();
const revisionDetails = cp.execSync('git log -n 1 HEAD').toString().trim();

const CONFIGS = {
    development: {
        bucket: 'static.pearcommerce.com'
    },
    production: {
        bucket: 'static.pearcommerce.com'
    }
};

const config = require('./pear-scripts/configuration.js')(null, null, CONFIGS, null);

gulp.task('deploy', [], function(callback) {
    require('./pear-scripts/s3-cloudfront-deploy.js')({
        config: config,
        cachedSources: ['./static/**/*'],
        uncachedSources: [],
        revision: revision,
        revisionDetails: revisionDetails,
        waitForCloudfrontInvalidation: false,
    }, callback);
});
