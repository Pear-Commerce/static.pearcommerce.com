/**
 * vue-component-gen
 *
 * @author Alex Wyler <alex@pearcommerce.com>
 *
 * Generates a set of .vue files based on configured file locations or convention.
 * Accepts a json object of the named components of the form:
 * {
 *     <component name>: {
 *         style: <css file path>,
 *         template: <html file path>,
 *         script: <CommonJS module>
 *     }
 * }
 * where all of style, template, and js are optional and by convention are defaulted to be the component name .css, .html,
 * and .js in the directories configured as described next
 *
 * An optional configuration object can be passed as well:
 * {
 *     style: <base path of css files, defaulting to "css/">,
 *     template: <base path of html files, defaulting to "html/">,
 *     script: <base path of js files, defaulting to "js/">
 * }
 */

const fs = require('fs');
const through = require('through2');
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;
const Vinyl = require('vinyl');
const PLUGIN_NAME = 'vue-component-gen';

module.exports = (config) => {
  config = config || {};
  const base = config['base'] || './';
  const scriptBase = base + (config['scriptPath'] || 'js/');
  const styleBase = base + (config['stylePath'] || 'css/');
  const templateBase = base + (config['templatePath'] || 'html/');

  /**
     * @this {Transform}
     */
  const transform = function(file, encoding, callback) {
    if (file.isNull()) {
      // nothing to do
      return callback(null, file);
    }

    Object.entries(JSON.parse(file.contents)).forEach((entry) => {
      const [key, value] = entry;
      const scriptFile = scriptBase + (value['script'] || (key + '.js'));
      const templateFile = templateBase + (value['template'] || (key + '.html'));
      const styleFile = styleBase + (value['style'] || (key + '.css'));

      const vueComponentFile = new Vinyl({
        cwd: '.',
        base: './components/',
        path: `./components/${key}.vue`,
        contents: Buffer.from(`
        <template>
            ${fs.existsSync(templateFile) ? fs.readFileSync(templateFile) : ''}
        </template>
        <script>
            ${fs.existsSync(scriptFile) ? fs.readFileSync(scriptFile) : ''}
        </script>
        <style scoped>
            ${fs.existsSync(styleFile) ? fs.readFileSync(styleFile) : ''}
        </style>
      `),
      });

      this.push(vueComponentFile);
    });
    callback();
  };

  return through.obj(transform);
};
