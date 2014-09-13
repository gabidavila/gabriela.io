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
            // Production where Grunt output the files
            css: './source/css/',
            js: './source/js/'

        },

        // Task configuration
        concat: {
            //...
        },
        less: {
            //...
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

// Task definition

};