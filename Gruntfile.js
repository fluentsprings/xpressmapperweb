module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'scripts/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        watch: {
            //hint :{
            //    files: ['<%= jshint.files %>'],
            //    tasks: ['jshint']
            //},
            styles: {
                files: ['styles/less/**/*.less', 'scripts/**/*.js'],
                tasks: ['default'],
                options: {
                    spawn: true,
                    event:['all']
                }
            }
        },
        bowercopy: {
            options: {
                clean:false,
                //destPrefix: '/',
                report: false
            },
            all: {
                files: {
                    'scripts/ext/jquery.js': 'jquery/dist/jquery.js',
                    'scripts/ext/chart.js': 'chartjs/Chart.js',
                    'scripts/ext/prism.js': 'prism/prism.js',
                    'scripts/ext/prism-csharp.js': 'prism/components/prism-csharp.js',
                    'scripts/ext/prism-line-numbers.js': 'prism/plugins/line-numbers/prism-line-numbers.js',
                    'styles/ext/prism-line-numbers.css': 'prism/plugins/line-numbers/prism-line-numbers.css',
                    'scripts/ext/prism-show-language.js': 'prism/plugins/show-language/prism-show-language.js',
                    'styles/ext/prism-show-language.css': 'prism/plugins/show-language/prism-show-language.css',
                    'styles/ext/prism-coy.css': 'prism/themes/prism-coy.css'
                }
            }
        },
        less: {
            options: {
                paths: ['styles/less/imports/'],
                ieCompat: false
            },
            src: {
                expand: true,
                cwd: 'styles/less/',
                src: [
                    '**/*.less', '!**/imports/*.less'
                ],
                ext: '.css',
                dest: 'styles/css/'
            }
        },
        concat: {
            css: {
                files: {
                    'styles/bundles/layout.css':
                        ['styles/ext/reset.css',
                            'styles/css/**/*.css',
                            'styles/ext/prism-coy.css',
                            'styles/ext/prism-line-numbers.css',
                            'styles/ext/prism-show-language.css'
                        ]
                }
            },
            scripts: {
                files: {
                    'scripts/bundles/default.js': [
                        'scripts/ext/jquery.js',
                        'scripts/ext/jquery-ui.js',
                        'scripts/ext/chart.js',
                        'scripts/*.js']
                }
            },
            scriptPrism: {
                files: {
                    'scripts/bundles/prism.js': [
                        'scripts/ext/prism.js',
                        'scripts/ext/prism-csharp.js',
                        'scripts/ext/prism-show-language.js',
                        'scripts/ext/prism-line-numbers.js'
                        ]
                }
            }
        },

        uglify: {
            default: {
                files: {
                    'scripts/bundles/default.min.js': ['scripts/bundles/default.js']
                }
            },
            prism: {
                files: {
                    'scripts/bundles/prism.min.js': ['scripts/bundles/prism.js']
                }
            }
        },
        cssmin: {
            default: {
                files: {
                    'styles/bundles/layout.min.css' : ['styles/bundles/layout.css']
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    //grunt.registerTask('default', ['jshint']);
    grunt.registerTask('default',['less','concat','cssmin'/*,'uglify'*/]);
};