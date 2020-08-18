/**
 * gulp-vue-boilerplater
 *
 * @author Alex Wyler <alex@pearcommerce.com>
 *
 * Generates a set of .vue files (expecting to be used with browserify and gulp-fileinclude based on conventions)
 * Accepts a json object of the named components of the form:
 * {
 *     <component name>: {
 *         style: <css file path>,
 *         template: <html file path>,
 *         js: <CommonJS module>
 *     }
 * }
 * where all of style, template, and js are optional and by convention are defaulted to be the component name .css, .html,
 * and .js in the directories configured as described next
 *
 * An optional configuration object can be passed as well:
 * {
 *     style: <base path of css files, defaulting to "css/">,
 *     template: <base path of html files, defaulting to "html/">,
 *     js: <base path of js files, defaulting to "js/">
 * }
 */

module.exports = (components, config) => {
  /**
     * @this {Transform}
     */
  const transform = function(file, encoding, callback) {
    if (file.isNull()) {
      // nothing to do
      return callback(null, file);
    }

    if (file.isStream()) {
      // file.contents is a Stream - https://nodejs.org/api/stream.html
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));

      // or, if you can handle Streams:
      // file.contents = file.contents.pipe(...
      // return callback(null, file);
    } else if (file.isBuffer()) {
      // file.contents is a Buffer - https://nodejs.org/api/buffer.html
      this.emit('error', new PluginError(PLUGIN_NAME, 'Buffers not supported!'));

      // or, if you can handle Buffers:
      // file.contents = ...
      // return callback(null, file);
    }

    const c = file.contents.toString();
    const f = path.parse(file.path);
    const file1 = file.clone();
    const file2 = file.clone();
    file1.contents = new Buffer(c.substring(0, c.length / 2));
    file2.contents = new Buffer(c.substring(c.length / 2));
    file1.path = path.join(f.dir, f.name + '1' + f.ext);
    file2.path = path.join(f.dir, f.name + '2' + f.ext);
    this.push(file1);
    this.push(file2);
    cb();
  };

  return through.obj(transform);
};
