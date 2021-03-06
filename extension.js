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
        'start_command': function(custom_opts) {
            debug('Artwork config: ', custom_opts);
            var command = 'glslViewer',
                default_opts = {
                    '--aspect-mode': 'fill'     // cover the entire screen (other options: 'fit', 'stretch');
                },
                opts;

            if (custom_opts && typeof custom_opts === 'object') {
                opts = Object.assign(default_opts, custom_opts);
            } else {
                opts = default_opts;
            }

            // append frag for specified aspect mode:
            command += ' ' + __dirname + '/frags/' + opts['--aspect-mode'] + '.frag';
            command += ' $filepath';
            return command;
        },
        // how do we stop this type of artwork?
        'end_command': 'sudo pkill -f glslViewer'
    }
});
