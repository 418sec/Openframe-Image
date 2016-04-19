var pjson = require('./package.json'),
    debug = require('debug')('openframe:image'),
    Extension = require('openframe-extension');

/**
 * Extension initialization method.
 *
 * Called when the extension (and its dependencies) have been installed.
 *
 * @param  {object} OF An interface provided to extensions giving limited access to the frame environment
 */

module.exports = new Extension({
    format: {
        // the name should be the same as the package name
        'name': pjson.name,
        // this is what might get displayed to users
        'display_name': 'Image (JPG, PNG)',
        // does this type of artwork need to be downloaded to the frame?
        'download': true,
        // how do start this type of artwork? currently two token replacements, $filepath and $url
        'start_command': function(config) {
            return 'sudo fbi --noverbose -T 1 $filepath';
        },
        // how do we stop this type of artwork?
        'end_command': 'sudo pkill -f fbi'
    }
});