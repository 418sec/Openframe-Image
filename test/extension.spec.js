var assert = require('assert'),
    Extension = require('openframe-extension'),
    ImageExtension = require('../extension');

describe('instantiation', function() {
    it('should be an instance of type Extension', function() {
        assert(ImageExtension instanceof Extension);
    });
});

describe('properties', function() {
    it('should include all required format properties', function() {
        var format = ImageExtension.props.format;

        assert(format.name);
        assert(typeof format.name === 'string');

        assert(format.display_name);
        assert(typeof format.display_name === 'string');

        assert(format.download !== undefined);
        assert(typeof format.download === 'boolean');

        assert(format.start_command);
        assert(typeof format.start_command === 'string' || typeof format.start_command === 'function');

        if (typeof format.start_command === 'function') {
            assert(typeof format.start_command() === 'string');
        }

        assert(format.end_command);
        assert(typeof format.end_command === 'string');
    });

    it('start_command should default to fill aspect mode', function() {
        var format = ImageExtension.props.format,
            command = format.start_command(),
            dir = __dirname.substring(0, __dirname.length - 5),
            expected = 'glslViewer ' + dir + '/frags/fill.frag $filepath';

        assert(typeof command === 'string');
        assert.equal(command, expected);
    });

    it('should allow override of aspect mode in start_command', function() {
        var format = ImageExtension.props.format,
            config = {
                '--aspect-mode': 'fit'
            },
            command = format.start_command(config),
            dir = __dirname.substring(0, __dirname.length - 5),
            expected = 'glslViewer ' + dir + '/frags/fit.frag $filepath';

        assert(typeof command === 'string');
        assert.equal(command, expected);
    });

});
