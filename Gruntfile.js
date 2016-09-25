'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        concat: {
            dist: {
                src: [
                    'js/*.js', // All JS in the libs folder
                ],
                dest: 'js/production.js',
            }
        },
        uglify: {
            build1: {
                src: 'js/production.js',
                dest: 'js/production.min.js'
            },
            build2: {
                src: 'views/js/main.js',
                dest: 'views/js/main.min.js'
            }
        },
        clean: {
            shortPathTest: ['js/production.js','js/production.min.js','img/pizzeria.jpg', 'img/mobilewebdev.jpg', 'img/jaime70x70.jpg',
                'css/output.min.css', 'views/css/output.min.css', 'img/mobilewebdev.jpg', 'img/beach.jpg', 'img/2048.png'
            ],
        },
        responsive_images: {
            options: {
                // Task-specific options go here.
                engine: 'im'
            },
            custom_size: {
                options: {
                    sizes: [{
                        width: 110,
                        name: "small",
                        quality: 20
                    }, {
                        width: 640,
                        name: "large",
                        quality: 50
                    }]
                },
                files: [{
                    expand: true,
                    src: ['img/original/pizzeria.jpg', 'img/original/jaime70x70.jpg'],
                    custom_dest: 'img/{%= name %}/'
                }]
            },
            custom_large: {
                options: {
                    sizes: [{
                        width: 500,
                        name: "large",
                        quality: 40
                    }]
                },
                files: [{
                    expand: true,
                    src: ['img/original/2048.png', 'img/original/mobilewebdev.jpg', 'img/original/beach.jpg'],
                    custom_dest: 'img/'
                }]
            },
        },
        /* Copy the "fixed" images that don't go through processing into the images/directory */
        copy: {
            dev: {
                files: [{
                    expand: true,
                    src: 'img/output/**.{gif,jpg,png}',
                    dest: 'img/'
                }]
            },
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target1: {
                files: [{
                    'css/output.min.css': ['css/style.css']
                }]
            },
            target2: {
                files: [{
                    'views/css/output.min.css': ['css/bootstrap-grid.css','views/css/style.css']
                }]
            }
        },
        htmlmin: { // Task
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            compile: {
                files: {
                    'index.html': 'index-src.htm', // 'destination': 'source'
                    'project-2048.html': 'project-2048-src.htm',
                    'project-mobile.html': 'project-mobile-src.htm',
                    'project-webperf.html': 'project-webperf-src.htm',
                    'views/pizza.html': 'views/pizza-src.htm'
                }
            },
        },

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-responsive-images');

    // Default task.
    grunt.registerTask('default', ['clean', 'concat', 'uglify', 'cssmin', 'htmlmin', 'responsive_images','copy']);

};
