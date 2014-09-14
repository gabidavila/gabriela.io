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
                freelancer: './source/assets/vendor/freelancer/',
                personal: './source/assets/vendor/freelancer/'
            },
            // Production where Grunt output the files
            css: './source/css/',
            js: './source/js/'
        },

        // Task configuration
        concat: {
           // freelancer: {
                options: {
                    separator: ';',
                },
                freelancer_js_header: {
                    src: [
                        '<%= paths.assets.js %>freelancer/custom.js'
                    ],
                    dest: '<%= paths.js %>freelancer/scripts_header.js',
                },
                freelancer_js_footer: {
                    src: [
                        '<%= paths.assets.vendor %>jquery/dist/jquery.js',
                        '<%= paths.assets.vendor %>bootstrap/dist/js/bootstrap.js',
                        '<%= paths.assets.vendor %>jquery.easing.1.3/index.js',
                        '<%= paths.template.freelancer %>js/classie.js',
                        '<%= paths.template.freelancer %>js/cbpAnimatedHeader.js',
                        '<%= paths.template.freelancer %>js/jqBootstrapValidation.js',
                        '<%= paths.template.freelancer %>js/contact_me.js',
                        '<%= paths.template.freelancer %>js/freelancer.js'
                    ],
                    dest: '<%= paths.js %>freelancer/scripts_footer.js',
                },
            personal_js_header: {
                src: [
                    '<%= paths.assets.js %>personal/custom.js'
                ],
                dest: '<%= paths.js %>personal/scripts_header.js',
            },
            personal_js_footer: {
                src: [
                    '<%= paths.assets.vendor %>jquery/dist/jquery.js',
                    '<%= paths.assets.vendor %>bootstrap/dist/js/bootstrap.js',
                    '<%= paths.assets.vendor %>jquery.easing.1.3/index.js',
                    '<%= paths.template.personal %>js/classie.js',
                    '<%= paths.template.personal %>js/cbpAnimatedHeader.js',
                    '<%= paths.template.personal %>js/jqBootstrapValidation.js',
                    '<%= paths.template.personal %>js/contact_me.js',
                    '<%= paths.template.personal %>js/freelancer.js'
                ],
                dest: '<%= paths.js %>personal/scripts_footer.js',
            }
            //}
        },
        less: {
            freelancer: {
                options: {
                    compress: true,  //minifying the result
                },
                files: {
                    //compiling freelancer.less into freelancer.min.css
                    "<%= paths.css %>freelancer/freelancer.min.css":"<%= paths.assets.css %>freelancer/freelancer.less",
                    //compiling styles.less into styles.min.css
                    "<%= paths.css %>freelancer/styles.min.css":"<%= paths.assets.css %>freelancer/styles.less"
                }
            },
            personal: {
                options: {
                    compress: true,  //minifying the result
                },
                files: {
                    //compiling bootstrap.less into bootstrap.min.css
                    "<%= paths.css %>personal/bootstrap.min.css":"<%= paths.assets.css %>personal/bootstrap.less",
                    //compiling personal.less into personal.min.css
                    "<%= paths.css %>personal/personal.min.css":"<%= paths.assets.css %>personal/personal.less",
                    //compiling styles.less into styles.min.css
                    "<%= paths.css %>personal/styles.min.css":"<%= paths.assets.css %>personal/styles.less"
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