module.exports = function (grunt) {
    grunt.initConfig({
            uglify: {
                js: {
                    files: {
                        'build/jquery.smooth.line.min.js': [
                            'jquery.smooth.line.js'
                        ]
                    }
                }
            },
            copy: {
                main: {
                    files: [
                        {expand: true, src: ['jquery.smooth.line.js'], dest: 'src/', filter: 'isFile'},
                        {expand: true, src: ['jquery.smooth.line.js'], dest: 'build/', filter: 'isFile'}
                    ]
                }
            }
        }
    );
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', [ 'uglify', 'copy']);

};