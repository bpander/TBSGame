/*jshint node:true, laxbreak:true */
'use strict';

module.exports = function(grunt) {
    var shouldMinify = !grunt.option('dev');

    grunt.config.merge({
        copy: {
            buildMarkup: {
                files: [{
                    expand: true,
                    cwd: '<%= env.DIR_SRC %>',
                    dest: '<%= env.DIR_DEST %>',
                    src: ['**/*.html', '!assets/vendor/**']
                }]
            }
        },

        // Replaces script and style tag references with a reference to a
        // single optimized output file.
        usemin: {
            html: ['<%= env.DIR_DEST %>/**/*.html']
        }
    });

    grunt.registerTask('buildMarkup',
        shouldMinify
            ? [
                'copy:buildMarkup',
                'usemin'
            ]
            : [
                'copy:buildMarkup'
            ]
    );
};
