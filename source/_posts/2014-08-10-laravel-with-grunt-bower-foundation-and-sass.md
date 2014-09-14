---
title: Laravel with Grunt, Bower, Foundation and Sass
draft: false
categories:
    - tutorial
    - laravel
    - frontend

---

I needed to use Grunt and Bower with Laravel for a project. So, I did some digging, and found [Harianto van Insulide](http://blog.mdstn.com/using-laravel-grunt-bootstrap-and-less) tutorial. He used somethings similar with what I needed, so I followed his tutorial and made my own modifications. So this is the result!

<!--more-->

## Installing Dependencies

### Composer

If you don't have composer installed, just enter the following:

[gist id="6b4e2c0866c9e12f2b85"]

### Ruby/Sass

If you use Windows , you need to download **ruby**: [https://www.ruby-lang.org/pt/downloads/](https://www.ruby-lang.org/pt/downloads/).

For Mac OS X , **ruby** already comes installed.

For Linux  machine, you can download via <span class="codigo">apt-get</span> ou <span class="codigo">yum</span>.

So, from that just run:

[gist id="ab54f48fbec13c5ebffc"]

### Laravel

To install, you can download the latest version in a [package](https://github.com/laravel/laravel/archive/master.zip) or use the <span class="codigo">composer</span> command:

[gist id="c4c332b6c162e4c0cd2a"]

### NodeJS

You can get the installer from NodeJS website: [http://nodejs.org/download/](http://nodejs.org/download/).

* * *

&nbsp;

### Grunt and Bower

Both can be installed only globally, so if you want them to be installed locally just remove the <span class="codigo">-g</span> to the command bellow:

[gist id="5eb6918309fa5e9189f8"]

#### Grunt Initialization

**Grunt** is a task runner, it allows you to automate the tasks of sass compiling, javascript minification, CND upload and every other task you need. Grunt comes with a lot of plugins, so you can just browse on their [site](http://gruntjs.com/) to find some awesome ones!
> I recommend doing the following commands inside <span class="codigo">laravel</span> folder, you can do in the project root, but this is a personal choice, just remember of updating the path if you are using a different one.
So as we do with <span class="codigo">git</span>, we must do with <span class="codigo">grunt</span>:

[gist id="bd28538a54198c906fca"]

You can fill the fields as I did:
> name: <span class="codigo">laravelTutorial</span>
> version: <span class="codigo">0.1.0</span>
> description: <span class="codigo">This is a Laravel with Grunt, Bower, Foundation and Sass Tutorial made by @gabidavila: http://gabriela.io  </span>
> entry point: <span class="codigo">Gruntfile.js</span>
> test command: <kbd>Enter</kbd>
> git repository: <span class="codigo">git@github.com:gabidavila/laravel-grunt-bower-foundation.git</span>
> keywords: <span class="codigo">laravel, grunt, foundation, sass, bower</span>
> author: <span class="codigo">Gabriela D'Avila &lt;gabidavila&gt;</span>
> license: <span class="codigo">MIT</span>
A new file will be generated, <span class="codigo">package.json</span>, there will be the information about your **grunt** configuration. Most importantly, where it is the <span class="codigo">Gruntfile.js</span>. Do not worry about the <span class="codigo">scripts/tests</span> item, you can change it in the future.

[gist id="a95296ee548fb13cd673"]

#### Grunt Plugins

In this tutorial I'll use some features of Grunt:

*   **Concat**: makes all the javascript into a single file (<span class="codigo">grunt-contrib-concat</span>)
*   **Uglify**: minifies all the javascript (<span class="codigo">grunt-contrib-uglify</span>)
*   **PHPUnit**: allows us to run PHP unit tests (<span class="codigo">grunt-phpunit</span>)
*   **Sass**: to compile Sass (<span class="codigo">grunt-contrib-sass</span>)
To install is very simple, just run:

[gist id="7919e1d215ab22c22446"]

The <span class="codigo">--save-dev</span>  argument includes the plugins in your <span class="codigo">package.json</span> file.

* * *

&nbsp;

### Bower

**Bower** is a package manager, a better description would be a dependency manager for the frontend, just like **Composer** does for everything else. You can learn more here: [http://bower.io/](http://bower.io/).

When we ask <span class="codigo">bower</span> to download our dependency as default it adds a <span class="codigo">bower_components</span> folder in the same path as the command was made. So, we need to adjust the path to be more organized.

Create a <span class="codigo">.bowerrc</span> file in your **Laravel** root:

[gist id="2bb7775c7557da2c2245"]

This will inform to **bower** where to download the dependencies.

#### Installing Foundation and other dependencies

As we do with **composer** lets create a <span class="codigo">bower.json</span> file. Initially just add your project name:

[gist id="2aa28e9d2b111ac343a3"]

This file will be updated as dependency are installed with the <span class="codigo">-S</span> argument. To install foundation:

[gist id="a492a07a08f1ca6fe4c9"]

**Foundation** already install some dependencies, like <span class="codigo">jQuery</span>, <span class="codigo">modernizr</span> and <span class="codigo">fastclick</span>. If you look at your <span class="codigo">bower.json</span> file you'll see:

[gist id="7b159b1a77a0a65251bc"]

And at the <span class="codigo">public/assets/vendor</span> folder:

[gist id="376033917cdc5636fd7b"]

I did some organization in the structure of javascript and css, I created the following folders and files:

[gist id="b15e12b701910ce3a9ab"]

The content of the file  <span class="codigo">public/assets/stylesheets/base.scss</span> is:

[gist id="0b9c695dfc00e9a0e3da"]

The <span class="codigo">variables.scss</span> file is a copy of <span class="codigo">_settings.scss</span>, so you can customize your scss. You can see the [content here](https://gist.github.com/gabidavila/7e18bbcf0c0c192e7acc).

* * *

&nbsp;

### Gruntfile.js

Now is the fun part. Here we will inform how we want **grunt** to behave. Where do we want it to put the compiled <span class="codigo">scss</span> file, how to minify the files, etc.

This is a minimum <span class="codigo">Gruntfile.js</span> template:

[gist id="f6b34429cb92582f3087"]

#### Configuring SCSS compiling

In the <span class="codigo">sass</span> section, add the following:

[gist id="b35b09288a0acfe85223"]

Note that the end of the file we added the plugin loading for <span class="codigo">compass</span> and <span class="codigo">sass</span>. To see if this is working, just execute: <span class="codigo">grunt sass</span>

The SCSS will be compiled into the <span class="codigo">public/css/base.css</span> file.

#### The Javascript

**Foundation** uses some Javascript dependencies in different locations of the HTML file, so we have **modernizr** in the head section and **jQuery** at the footer section, so I think the best approach here is to separate these two, as <span class="codigo">js_header</span> and <span class="codigo">js_footer</span>. These two sections will get all the Javascript files and create respectively <span class="codigo">script_header.js</span> and <span class="codigo">script_footer.js</span>.

[gist id="d63a9e3e36398d5a3b4e"]

You can read more about Javascript files setup in Foundation here: [http://foundation.zurb.com/docs/javascript.html](http://foundation.zurb.com/docs/javascript.html).

To see if this is working, just execute: <span class="codigo">grunt concat</span>, and the files will be added int <span class="codigo">/public/js</span> directory, if you want to concat just the footer or the head section, use <span class="codigo">grunt concat:js_header</span> or <span class="codigo">grunt concat:js_footer</span>:

[gist id="ba1b82485d35bc91e12e"]

Now, the javascript is all in single files as we defined, and to load faster we can minify them. The uglify task will be defined as bellow:

[gist id="ced66cea201d14d0f34d"]

After run <span class="codigo">grunt uglify</span>, **grunt** will create a <span class="codigo">min</span> folder inside <span class="codigo">/public/js</span> with two files: <span class="codigo">script_header.min.js</span> and <span class="codigo">script_footer.min.js</span>.

[gist id="cc6184be3edb587fd770"]

* * *

&nbsp;

### PHPUnit

So, if you work with PHPUnit, you can make **Grunt** run your tests for you. You just have to configure where the test classes are and the <span class="codigo">bin</span> location. You may not have **phpunit** installed in your project, for that, add the following line in the <span class="codigo">composer.json</span> file:

[gist id="b84554ce5c35ee5dfda8"]

And run <span class="codigo">composer update</span> to install the binary in <span class="codigo">/vendor/bin</span>.

After, just add the phpunit in <span class="codigo">Gruntfile.js</span>:

[gist id="a9f6332ee9df989f3f45"]

Running the tests: <span class="codigo">grunt phpunit</span>

Bellow the output:

[![Gruntfile_js_-_laravel_-____PhpstormProjects_tutorial_laravel_](http://s3.davila.blog.br/wp-content/uploads/sites/2/2014/08/Gruntfile_js_-_laravel_-____PhpstormProjects_tutorial_laravel_1-1024x418.png)](http://s3.davila.blog.br/wp-content/uploads/sites/2/2014/08/Gruntfile_js_-_laravel_-____PhpstormProjects_tutorial_laravel_1.png)

* * *

### At last!

Until now we defined 4 tasks:

*   <span class="codigo">sass</span>
*   <span class="codigo">concat</span>
*   <span class="codigo">uglify</span>
*   <span class="codigo">phpunit</span>
For running all 4 tasks with a single command, you can define a task, I defined that when I run <span class="codigo">grunt</span> in the terminal, it will run all 4 tasks:

[gist id="fb03a4b13bcc1fa096f1"]

The final <span class="codigo">Gruntfile.js</span>:

[gist id="d539c37266356b1d1f21"]

* * *

&nbsp;

## Skeleton

I created a Github skeleton of the code used here. The source code is here: [https://github.com/gabidavila/laravel-grunt-skeleton](https://github.com/gabidavila/laravel-grunt-skeleton)

This are the steps:

[gist id="430adb700303bb5f985c"]