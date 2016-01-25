var pjson = require('./package.json'),
    plugin = module.exports = {};

// Currently unused... but maybe a good idea?
plugin.config = {
    platform: 'rpi'
};

/**
 * Plugin initialization method.
 *
 * Called when the plugin (and its dependencies) have been installed.
 *
 * @param  {object} ofPluginApi An interface provided to plugins giving limitted access to the frame environment
 */
plugin.init = function(ofPluginApi) {
    // do your plugin thing
    console.log('=======>   Openframe-Image initialized!   <=======');

    /**
     * Plugins can add new artwork formats to the frame.
     *
     * Each format must have a unique name, which should correspond to the
     * name of the npm package.
     */
    ofPluginApi.addFormat(
        {
            // the name should be the same as the package name
            'name': pjson.name,
            // this is what might get displayed to users
            'display_name': 'Image (JPG, PNG)',
            'download': true,
            'start_command': 'sudo fbi -a --noverbose -T 1 $filepath',
            'end_command': 'sudo pkill -f fbi',
            'tags': ['image']
        }
    );

    /**
     * Plugins also have access to the global event system
     */
    plugin.pubsub = ofPluginApi.getPubsub();
};

