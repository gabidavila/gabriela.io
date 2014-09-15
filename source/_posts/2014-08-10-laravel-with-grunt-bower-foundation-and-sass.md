---
title: Laravel with Grunt, Bower, Foundation and Sass
draft: false
date: "2014-08-10"
author: gabriela
categories:
    - Tutorial
tags:
    - bower
    - laravel
    - sass
    - grunt
    - foundation
use:
    - posts_tags
    - posts_categories
---

I needed to use Grunt and Bower with Laravel for a project. So, I did some digging, and found [Harianto van Insulide](http://blog.mdstn.com/using-laravel-grunt-bootstrap-and-less) tutorial. He used somethings similar with what I needed, so I followed his tutorial and made my own modifications. So this is the result!

<!--more-->

## Installing Dependencies

### Composer

If you don't have composer installed, just enter the following:

~~~command
$ curl -sS https://getcomposer.org/installer | php
~~~
### Ruby/Sass

If you use Windows , you need to download **ruby**: [https://www.ruby-lang.org/pt/downloads/](https://www.ruby-lang.org/pt/downloads/).

For Mac OS X , **ruby** already comes installed.

For Linux  machine, you can download via `apt-get` or `yum`.

So, from that just run:

    $ gem install compass
    $ gem install sass

### Laravel

To install, you can download the latest version in a [package](https://github.com/laravel/laravel/archive/master.zip) or use the `composer` command:

    $ composer create-project laravel/laravel --prefer-dist

### NodeJS

You can get the installer from NodeJS website: [http://nodejs.org/download/](http://nodejs.org/download/).

* * *

### Grunt and Bower

Both can be installed only globally, so if you want them to be installed locally just remove the `-g` to the command bellow:

~~~shell
$ npm install -g grunt-cli
$ npm install -g bower
~~~
#### Grunt Initialization

**Grunt** is a task runner, it allows you to automate the tasks of sass compiling, javascript minification, CND upload and every other task you need. Grunt comes with a lot of plugins, so you can just browse on their [site](http://gruntjs.com/) to find some awesome ones!
> I recommend doing the following commands inside `laravel` folder, you can do in the project root, but this is a personal choice, just remember of updating the path if you are using a different one.
So as we do with `git`, we must do with `grunt`:

    $ npm init

You can fill the fields as I did:
> name : `laravelTutorial`

> version : `0.1.0`

> description : `This is a Laravel with Grunt, Bower, Foundation and Sass Tutorial made by @gabidavila: http://gabriela.io  `

> entry point : `Gruntfile.js`

> test command : <kbd>Enter</kbd>

> git repository : `git@github.com:gabidavila/laravel-grunt-bower-foundation.git`

> keywords : `laravel, grunt, foundation, sass, bower`

> author : `Gabriela D'Avila &lt;gabidavila&gt;`

> license : `MIT`

A new file will be generated, `package.json`, there will be the information about your **grunt** configuration. Most importantly, where it is the `Gruntfile.js`. Do not worry about the `scripts/tests` item, you can change it in the future.


    {
      "name": "laravelTutorial",
      "version": "0.1.0",
      "description": "This is a Laravel with Grunt, Bower, Foundation and Sass Tutorial made by @gabidavila: http://en.davila.blog.br",
      "main": "Gruntfile.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "repository": {
        "type": "git",
        "url": "git remote add origin git@github.com:gabidavila/laravel-grunt-bower-foundation.git"
      },
      "keywords": [
        "laravel",
        "grunt",
        "foundation",
        "sass",
        "bower"
      ],
      "author": "Gabriela D'Avila <gabidavila>",
      "license": "MIT",
      "bugs": {
        "url": "https://github.com/gabidavila/laravel-grunt-bower-foundation/issues"
      },
      "homepage": "https://github.com/gabidavila/laravel-grunt-bower-foundation"
    }


#### Grunt Plugins

In this tutorial I'll use some features of Grunt:

*   **Concat**: makes all the javascript into a single file (`grunt-contrib-concat`)
*   **Uglify**: minifies all the javascript (`grunt-contrib-uglify`)
*   **PHPUnit**: allows us to run PHP unit tests (`grunt-phpunit`)
*   **Sass**: to compile Sass (`grunt-contrib-sass`)
To install is very simple, just run:

~~~
# --save-dev saves this plugins in package.json, so just keep them here :)

$ npm install grunt --save-dev
$ npm install grunt-contrib-concat --save-dev
$ npm install grunt-contrib-uglify --save-dev
$ npm install grunt-phpunit --save-dev
$ npm install grunt-contrib-compass --save-dev
$ npm install grunt-contrib-sass --save-dev

# OR a single command :O

$ npm install grunt grunt-contrib-concat grunt-contrib-uglify grunt-phpunit grunt-contrib-compass grunt-contrib-sass --save-dev
~~~

The `--save-dev`  argument includes the plugins in your `package.json` file.

* * *

### Bower

**Bower** is a package manager, a better description would be a dependency manager for the frontend, just like **Composer** does for everything else. You can learn more here: [http://bower.io/](http://bower.io/).

When we ask `bower` to download our dependency as default it adds a `bower_components` folder in the same path as the command was made. So, we need to adjust the path to be more organized.

Create a `.bowerrc` file in your **Laravel** root:

    {
      "directory": "public/assets/vendor"
    }

This will inform to **bower** where to download the dependencies.

#### Installing Foundation and other dependencies

As we do with **composer** lets create a `bower.json` file. Initially just add your project name:

    {
        "name": "laravelTutorial"
    }

This file will be updated as dependency are installed with the `-S` argument. To install foundation:

    $ bower install foundation -S

**Foundation** already install some dependencies, like `jQuery`, `modernizr` and `fastclick`. If you look at your `bower.json` file you'll see:

    {
        "name": "laravelTutorial",
        "dependencies": {
            "foundation": "~5.3.3"
        }
    }


And at the `public/assets/vendor` folder:

    public/assets/vendor/
    |-- fastclick
    |-- foundation
    |-- jquery
    |-- jquery-placeholder
    |-- jquery.cookie
    `-- modernizr


I did some organization in the structure of javascript and css, I created the following folders and files:

    public/
    |-- assets
    |   |-- stylesheets
    |   |   |-- base.scss           # base from foundation
    |   |   |-- custom.scss         # for customs scss
    |   |   `-- variables.scss      # for custom variables
    |   `-- javascripts
    |       `-- custom.js           # for customs javascript
    |-- css
    `-- js


The content of the file  `public/assets/stylesheets/base.scss` is:

    /*
     * public/assets/stylesheets/base.scss
     * Files from foundation
     */
    @import 'variables';
    @import '../vendor/foundation/scss/normalize';
    @import '../vendor/foundation/scss/foundation';

The `variables.scss` file is a copy of `_settings.scss`, so you can customize your scss. You can see the [content here](https://gist.github.com/gabidavila/7e18bbcf0c0c192e7acc).

* * *

### Gruntfile.js

Now is the fun part. Here we will inform how we want **grunt** to behave. Where do we want it to put the compiled `scss` file, how to minify the files, etc.

This is a minimum `Gruntfile.js` template:

~~~javascript
//Gruntfile
module.exports = function(grunt) {

//Initializing the configuration object
grunt.initConfig({

    // Paths variables
    paths: {
      // Development where put SASS files, etc
      assets: {
        css: './public/assets/stylesheets/',
        js: './public/assets/javascripts/',
        vendor: './public/assets/vendor/'
      },
      // Production where Grunt output the files
      css: './public/css/',
      js: './public/js/'

    },

    // Task configuration
    concat: {
      //...
    },
    sass: {
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
~~~

#### Configuring SCSS compiling

In the `sass` section, add the following:

~~~javascript
// Part of Gruntfile.js, this is the sass section
sass:  {
    css: {
        options: {
            style: 'compressed',
            compass: true
        },
        // This will get all the scss files in /public/assets/stylesheets
        files: [{
            expand: true,
            cwd: '<%= paths.assets.css %>',
            src: '**/*.scss',
            dest: '<%= paths.css %>',
            ext: '.css',
        }],
    },
},

// This is at the end of the file, the plugin section:
// Plugin loading
grunt.loadNpmTasks('grunt-contrib-compass');
grunt.loadNpmTasks('grunt-contrib-sass');
~~~

Note that the end of the file we added the plugin loading for `compass` and `sass`. To see if this is working, just execute: `grunt sass`

The SCSS will be compiled into the `public/css/base.css` file.

#### The Javascript

**Foundation** uses some Javascript dependencies in different locations of the HTML file, so we have **modernizr** in the head section and **jQuery** at the footer section, so I think the best approach here is to separate these two, as `js_header` and `js_footer`. These two sections will get all the Javascript files and create respectively `script_header.js` and `script_footer.js`.
~~~javascript
// Part of Gruntfile.js, this is the Concat section
concat: {
    options: {
        separator: ';',
    },
    js_header: {
        src: [
            '<%= paths.assets.vendor %>modernizr/modernizr.js',
            '<%= paths.assets.js %>custom.js'
        ],
        dest: '<%= paths.js %>expanded/scripts_header.js',
    },
    js_footer: {
        src: [
            '<%= paths.assets.vendor %>jquery/dist/jquery.js',
            '<%= paths.assets.vendor %>jquery.cookie/jquery.cookie.js',
            '<%= paths.assets.vendor %>jquery.placeholder/jquery.placeholder.js',
            '<%= paths.assets.vendor %>fastclick/lib/fastclick.js',
            '<%= paths.assets.vendor %>foundation/js/foundation.js'
        ],
        dest: '<%= paths.js %>expanded/scripts_footer.js',
    }
},

// This is at the end of the file, the plugin section:
// Plugin loading
grunt.loadNpmTasks('grunt-contrib-compass');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-concat');
~~~

You can read more about Javascript files setup in Foundation here: [http://foundation.zurb.com/docs/javascript.html](http://foundation.zurb.com/docs/javascript.html).

To see if this is working, just execute: `grunt concat`, and the files will be added int `/public/js` directory, if you want to concat just the footer or the head section, use `grunt concat:js_header` or `grunt concat:js_footer`:

    # Files Generated by grunt concat

    public
    `-- js
        `-- expanded
            |-- scripts_footer.js
            `-- scripts_header.js


Now, the javascript is all in single files as we defined, and to load faster we can minify them. The uglify task will be defined as bellow:

~~~javascript
// Part of Gruntfile.js, this is the Uglify section
uglify: {
    options: {
        // Grunt can replace variables names, but may not be a good idea for you, I leave
        // this option as false
        mangle: false
    },
    js: {
        // Grunt will search for "**/*.js" when the "minify" task
        // runs and build the appropriate src-dest file mappings then, so you
        // don't need to update the Gruntfile when files are added or removed.
        files: [{
            expand: true,
            cwd: '<%= paths.js %>',
            src: '**/*.js',
            dest: '<%= paths.js %>min',
            ext: '.min.js',
        }],
    }
},

// This is at the end of the file, the plugin section:
// Plugin loading
grunt.loadNpmTasks('grunt-contrib-compass');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
~~~

After run `grunt uglify`, **grunt** will create a `min` folder inside `/public/js` with two files: `script_header.min.js` and `script_footer.min.js`.

    # Files Generated by grunt uglify

    public
    `-- js
        |-- min
        |   |-- scripts_footer.min.js
        |   `-- scripts_header.min.js
        `-- expanded
           |-- scripts_footer.js
           `-- scripts_header.js

* * *

### PHPUnit

So, if you work with PHPUnit, you can make **Grunt** run your tests for you. You just have to configure where the test classes are and the `bin` location. You may not have **phpunit** installed in your project, for that, add the following line in the `composer.json` file:

    {
        "require": {
            "laravel/framework": "4.2.*",
            "phpunit/phpunit": "4.*"
        }
    }


And run `composer update` to install the binary in `/vendor/bin`.

After, just add the phpunit in `Gruntfile.js`:

~~~javascript
// Part of Gruntfile.js, this is the Uglify section
phpunit: {
    classes: {
        dir: 'app/tests/'   //location of the tests
    },
    options: {
        bin: 'vendor/bin/phpunit',
        colors: true
    }
},

// This is at the end of the file, the plugin section:
// Plugin loading
grunt.loadNpmTasks('grunt-contrib-compass');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-phpunit');
~~~

Running the tests: `grunt phpunit`

Bellow the output:

[![Gruntfile_js_-_laravel_-____PhpstormProjects_tutorial_laravel_](http://s3.davila.blog.br/wp-content/uploads/sites/2/2014/08/Gruntfile_js_-_laravel_-____PhpstormProjects_tutorial_laravel_1-1024x418.png){.img-responsive .img-thumbnail}](http://s3.davila.blog.br/wp-content/uploads/sites/2/2014/08/Gruntfile_js_-_laravel_-____PhpstormProjects_tutorial_laravel_1.png)

* * *

### At last!

Until now we defined 4 tasks:

*   `sass`
*   `concat`
*   `uglify`
*   `phpunit`

For running all 4 tasks with a single command, you can define a task, I defined that when I run `grunt` in the terminal, it will run all 4 tasks:

~~~javascript
// Plugin loading
grunt.loadNpmTasks('grunt-contrib-compass');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-phpunit');

// Task definition
grunt.registerTask('default', ['sass', 'concat', 'uglify', 'phpunit']);
~~~

The final `Gruntfile.js`:

~~~javascript
//Gruntfile
module.exports = function (grunt) {

//Initializing the configuration object
    grunt.initConfig({

        // Paths variables
        paths: {
            // Development where put SASS files, etc
            assets: {
                css: './public/assets/stylesheets/',
                js: './public/assets/javascripts/',
                vendor: './public/assets/vendor/'
            },
            // Production where Grunt output the files
            css: './public/css/',
            js: './public/js/'

        },

        // Task configuration
        concat: {
            options: {
                separator: ';',
            },
            js_header: {
                src: [
                    '<%= paths.assets.vendor %>modernizr/modernizr.js',
                    '<%= paths.assets.js %>custom.js',
                ],
                dest: '<%= paths.js %>expanded/scripts_header.js',
            },
            js_footer: {
                src: [
                    '<%= paths.assets.vendor %>jquery/dist/jquery.js',
                    '<%= paths.assets.vendor %>jquery.cookie/jquery.cookie.js',
                    '<%= paths.assets.vendor %>jquery.placeholder/jquery.placeholder.js',
                    '<%= paths.assets.vendor %>fastclick/lib/fastclick.js',
                    '<%= paths.assets.vendor %>foundation/js/foundation.js'
                ],
                dest: '<%= paths.js %>expanded/scripts_footer.js',
            }
        },
        sass: {
            css: {
                options: {
                    style: 'compressed',
                    compass: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.assets.css %>',
                        src: '**/*.scss',
                        dest: '<%= paths.css %>',
                        ext: '.css',
                    }
                ],
            },
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
                        dest: '<%= paths.js %>min',
                        ext: '.min.js',
                    }
                ],
            }
        },
        phpunit: {
            classes: {
                dir: 'app/tests/'   //location of the tests
            },
            options: {
                bin: 'vendor/bin/phpunit',
                colors: true
            }
        }
    });

// Plugin loading
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-phpunit');

// Task definition
    grunt.registerTask('default', ['sass', 'concat', 'uglify', 'phpunit']);
};
~~~

* * *

## Conclusion

That's it! It can be a little overwhelming having to do all of this, but it is worth it because you know can work in a organized way.

Leve a comment bellow if you have any questions.