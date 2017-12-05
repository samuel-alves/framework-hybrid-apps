module.exports = function(grunt) {
    // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        availabletasks: {
            tasks: {
                options: {
                    filter: 'include',
                    tasks: ['android:install', 'android:launch', 'android:uninstall', 'build:dev', 'build:dist', 'default', 'clear', 'ios:folder', 'ios:xcode', 'help'],
                    sort: true,
                    descriptions: {
                        'android:install': 'Android: ADB install app',
                        'android:launch': 'Android: ADB launch/run app',
                        'android:uninstall': 'Android: ADB uninstall',
                        'build:dev': 'App: Build development app',
                        'build:dist': 'App: Build release app',
                        'default': 'Show this menu',
                        'clear': 'App: clear project',
                        'ios:folder': 'iOS: open iOS platform directory',
                        'ios:xcode': 'iOS: open xcode project',
                        'help': 'Show this menu'
                    }
                }
            }
        },

        adb: {
            install: {
                install: 'app/platforms/android/build/outputs/apk/android-debug.apk'
            },
            uninstall: {
                uninstall: '<%= pkg.id %>'
            },
            launch: {
                launch: '<%= pkg.id %>'
            }
        },

        /* Grunt bowe concat
         * https://github.com/sapegin/grunt-bower-concat
         * https://www.fuseinteractive.ca/blog/automating-bower-library-integration-grunt */
        bower_concat: {
            all: {
                dest: {
                    'js': 'app/www/js/bower.js',
                    'css': 'app/www/css/bower.css'
                },
                exclude: [],
                dependencies: {
                    /*'underscore': 'jquery',
                    'backbone': 'underscore',
                    'jquery-mousewheel': 'jquery'*/
                },
                bowerOptions: {
                    /*relative: false*/
                }
            }
        },

        clean: {
            www: ['app/www/*']
        },

        concat: {
            options: {
                // Separator placed at the end of the each file to concatenate
                separator: ';'
            },
            jsApp: {
                src: ['src/js/app/app.js', 'src/js/app/**/*.js'],
                dest: 'app/www/js/app.js'
            },
            jsVendor: {
                src: ['src/js/vendor/**.js'],
                dest: 'app/www/js/vendor.js'
            }
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: '**',
                    dest: 'app/www/img/'
                }, {
                    expand: true,
                    cwd: 'src/',
                    src: '**.html',
                    dest: 'app/www/'
                }]
            }
        },

        /* Grunt cordova cli
         * https://www.npmjs.com/package/grunt-cordovacli */
        cordovacli: {
            options: {
                path: 'app',
                cli: 'cordova'
            },
            add_platforms: {
                options: {
                    command: 'platform',
                    action: 'add',
                    platforms: ['ios', 'android']
                }
            },
            build_ios: {
                options: {
                    command: 'build',
                    platforms: ['ios']
                }
            },
            build_android: {
                options: {
                    command: 'build',
                    platforms: ['android']
                }
            },
            rm_android: {
                options: {
                    command: 'platform',
                    action: 'remove',
                    platforms: ['android']
                }
            },
            rm_ios: {
                options: {
                    command: 'platform',
                    action: 'remove',
                    platforms: ['ios']
                }
            },
            rm_platforms: {
                options: {
                    command: 'platform',
                    action: 'remove',
                    platforms: ['ios', 'android']
                }
            },
        },

        /* Configure cordova config.xml file
         * https://www.npmjs.com/package/grunt-cordova-config */
        cordova_config: {
            main: {
                options: {
                    id: '<%= pkg.id %>',
                    version: '<%= pkg.version %>',
                    name: '<%= pkg.name %>',
                    description: '<%= pkg.description %>',
                    author: {
                        email: '<%= pkg.author.email %>',
                        name: '<%= pkg.author.name %>',
                        href: '<%= pkg.author.url %>'
                    }
                },
                dest: 'app/config.xml'
            }
        },

        /* Handlebars Template Engine
         * http://danburzo.ro/grunt/chapters/handlebars/
         * https://npmjs.org/package/grunt-contrib-handlebars */
        handlebars: {
            // concatenate and compile all handlebars templates to a unique javascript file
            compile: {
                options: {
                    namespace: 'app.templates',
                    processName: function(filePath) {
                        return filePath.replace(/^src\/templates\//, '').replace(/\.hbs$/, '');
                    }
                },
                files: {
                    "app/www/js/app.templates.js": "src/templates/**/*.hbs"
                }
            }
        },

        javascript_obfuscator: {
            options: {
                debugProtection: true,
                debugProtectionInterval: true,
                /*more*/
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 0.4,
                disableConsoleOutput: true,
                stringArray: true,
                stringArrayEncoding: false,
                stringArrayThreshold: 0.75
            },
            main: {
                files: {
                    'app/www/js/app.js': ['app/www/js/app.js']
                }
            }
        },

        jshint: {
            files: ['Gruntfile.js', 'src/js/app/**.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    console: true,
                    module: true
                }
            }
        },

        preprocess: {
            options: {
                inline: true,
                context: {
                    APP_NAME: "<%= pkg.name %>",
                    APP_DESCRIPTION: "<%= pkg.description %>",
                    APP_VERSION: "<%= pkg.version %>",
                }
            },
            main: {
                src: ['app/www/js/app.js']
            }
        },

        /* Compile SASS files
         * https://github.com/gruntjs/grunt-contrib-sass */
        sass: {
            dev: {
                options: {
                    style: 'extended'
                },
                files: [{
                    expand: true,
                    cwd: 'src/scss/',
                    src: ['*.scss'],
                    dest: 'app/www/css/',
                    ext: '.css'
                }]
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'src/scss/',
                    src: ['*.scss'],
                    dest: 'app/www/css/',
                    ext: '.css'
                }]
            },
        },

        shell: {
            androidAppRun: {
                command: 'adb shell monkey -p <%= pkg.id %> -c android.intent.category.LAUNCHER 1'
            },
            iosOpenFolder: {
                command: 'open app/platforms/ios/'
            },
            iosOpenWorkspace: {
                command: 'open app/platforms/ios/<%= pkg.name %>.xcworkspace/'
            }
        }
    });

    // update configuration files
    grunt.registerTask('update_json', function(key, value) {
        var projectFile = "package.json";
        var bowerFile = "bower.json";
        var cordovaFile = "app/package.json";

        if (!grunt.file.exists(projectFile)) {
            grunt.log.error("file " + projectFile + " not found");
            return true; //return false to abort the execution
        }

        var project = grunt.file.readJSON(projectFile);

        if (grunt.file.exists(bowerFile)) {
            var bower = grunt.file.readJSON(bowerFile);
            bower.name = project.name;
            bower.version = project.version;
            bower.description = project.description;
            grunt.file.write(bowerFile, JSON.stringify(bower, null, 2));
        }

        if (grunt.file.exists(bowerFile)) {
            var cordova = grunt.file.readJSON(cordovaFile);
            cordova.name = project.id || cordova.name;
            cordova.displayName = project.name || cordova.displayName;
            cordova.version = project.version || cordova.version;
            cordova.description = project.description || cordova.description;
            cordova.author = project.author || cordova.author;
            cordova.license = project.license || cordova.license;
            grunt.file.write(cordovaFile, JSON.stringify(cordova, null, 2));
        }
    });

    // Register user tasks
    // print available tasks
    grunt.registerTask('default', ['availabletasks']);
    grunt.registerTask('help', ['availabletasks']);

    // group tasks into single task
    grunt.registerTask('cordova', ['cordovacli:rm_ios', 'cordovacli:rm_android', 'cordova_config', 'cordovacli:add_platforms', 'cordovacli:build_android', 'cordovacli:build_ios']);

    // manage project workflow
    grunt.registerTask('build:dev', ['jshint', 'update_json', 'clean', 'concat', 'copy', 'bower_concat', 'handlebars' ,'preprocess', 'sass:dev', 'cordova']);
    grunt.registerTask('build:dist', ['jshint', 'update_json', 'clean', 'concat', 'copy', 'bower_concat', 'handlebars','preprocess', 'sass:dist', 'javascript_obfuscator', 'cordova']);
    grunt.registerTask('clear', ['cordovacli:rm_platforms', 'clean']);

    // android app manager
    grunt.registerTask('android:install', ['adb:install']);
    grunt.registerTask('android:launch', ['shell:androidAppRun']);
    grunt.registerTask('android:uninstall', ['adb:uninstall']);

    // ios app manager
    grunt.registerTask('ios:xcode', ['shell:iosOpenWorkspace']);
    grunt.registerTask('ios:folder', ['shell:iosOpenFolder']);
};