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
                    "<%= paths.css %>styles.min.css":"<%= paths.assets.css %>styles.less"
                }
            }
        },
        uglify: {
            //...
        },
        phpunit: {
            //...
        },
        watch: {
            //...
        }
    });

// Plugin loading
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
// Task definition

};