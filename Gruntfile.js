//Gruntfile
module.exports = function(grunt) {

//Initializing the configuration object
    grunt.initConfig({

        // Paths variables
        paths: {
            // Development where put LESS files, etc
            assets: {
                css: './source/assets/stylesheets/',
                js: './source/assets/javascripts/',
                vendor: './source/assets/vendor/'
            },
            template : {
                files: './source/assets/vendor/freelancer/'
            },
            // Production where Grunt output the files
            css: './source/css/',
            js: './source/js/'

        },

        // Task configuration
        concat: {
            options: {
                separator: ';',
            },
            js_header: {
                src: [
                    '<%= paths.assets.js %>custom.js'
                ],
                dest: '<%= paths.js %>/scripts_header.js',
            },
            js_footer: {
                src: [
                    '<%= paths.assets.vendor %>jquery/dist/jquery.js',
                    '<%= paths.assets.vendor %>bootstrap/dist/js/bootstrap.js',
                    '<%= paths.assets.vendor %>jquery.easing.1.3/index.js',
                    '<%= paths.template.files %>js/classie.js',
                    '<%= paths.template.files %>js/cbpAnimatedHeader.js',
                    '<%= paths.template.files %>js/jqBootstrapValidation.js',
                    '<%= paths.template.files %>js/contact_me.js',
                    '<%= paths.template.files %>js/freelancer.js'
                ],
                dest: '<%= paths.js %>scripts_footer.js',
            }
        },
        less: {
            default: {
                options: {
                    compress: true,  //minifying the result
                },
                files: {
                    //compiling styles.less into styles.min.css
                    "<%= paths.css %>freelancer.min.css":"<%= paths.assets.css %>freelancer.less",
                    //compiling styles.less into styles.min.css
                    "<%= paths.css %>styles.min.css":"<%= paths.assets.css %>styles.less"
                }
            }
        },
        uglify: {
            options: {
                // Grunt can replace variables names, but may not be a good idea for you,
                // I leave this option as false
                mangle: false
            },
            js: {
                // Grunt will search for "**/*.js" when the "minify" task
                // runs and build the appropriate src-dest file mappings then, so you
                // don't need to update the Gruntfile when files are added or removed.
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.js %>',
                        src: '**/*.js',
                        dest: '<%= paths.js %>',
                        ext: '.min.js',
                    }
                ],
            }
        },
    });

// Plugin loading
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
// Task definition
    grunt.registerTask('default', ['less', 'concat', 'uglify']);
};