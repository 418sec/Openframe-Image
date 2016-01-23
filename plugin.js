
var plugin = module.exports = {},
    format;

// Do we need this? Are there other plugin-y config things?
plugin.config = {
    platform: 'rpi'
};

// TODO: should this be a constant, supplied by a base module?
// plugin.type = 'FORMAT';

/**
 * If this plugin is adding a new artwork format, the format definition
 * should be included as a 'format' property on the plugin object.
 *
 * Each format must have a unique name.
 *
 * @type {Object}
 */
format = {
    'display_name': 'Image (JPG, PNG)',
    'download': true,
    'start_command': 'sudo fbi -a --noverbose -T 1 $filepath',
    'end_command': 'sudo pkill -f fbi',
    'tags': ['image']
};

/**
 * Plugin initialization method
 *
 * Called when the plugin (and its dependencies) have been installed.
 *
 * TODO: This will likely get passed a sandboxed API object rather than the full frame controller...
 *
 * @param  {object} fc A reference to the frame controller
 */
plugin.init = function(fc) {
    // do your plugin thing
    console.log('=======>   Openframe-Image initialized!   <=======');
    fc.addFormat(format);
};
