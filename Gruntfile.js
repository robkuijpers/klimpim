'use strict';

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', 'assemble']});

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		src: 'src',
        tmp: 'tmp',
		dist: 'dist',

		clean: {
			dist: {
				src: ['<%= dist %>/*']
			},
		},

		sass: {
			options: {
				includePaths: ['<%= src %>/bower_components/foundation/scss'],
                outputStyle: 'nested',
                sourceMap: true,
                sourceComments: 'maps'
			},
			dist: {
				options: {
					outputStyle: 'extended'
				},
				files: {
					'<%= src %>/css/app.css': '<%= src %>/scss/app.scss'
				}
			}
		},

        autoprefixer: {
            all: {
                options: {
                    map: true
                },
                src: '<%= src %>/css/app.css',
                dest: '<%= src %>/css/app.css'
            }
        },

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= src %>/js/**/*.js'
			]
		},

		uglify: {
			options: {
				preserveComments: 'some',
				mangle: false
			}
		},

        assemble: {
            options: {
                partials: ['<%= src %>/html/parts/**/*.hbs'],
                layout: ['<%= src %>/html/layouts/default.hbs'],
                data: ['<%= src %>/html/data/*.json']
            },
            pages: {
                flatten: true,
				expand: true,
                src: ['<%= src %>/html/pages/*.hbs'],
                dest: '<%= src %>'
            }
        },

		copy: {
			dist: {
				files: [{
					expand: true,
					cwd:'<%= src %>/',
					src: ['images/**', 'fonts/**', '**/*.html', '!**/*.scss', '!html/**', '!bower_components/**'],
					dest: '<%= dist %>/'
				}]
			},
		},

		imagemin: {
			target: {
				files: [{
					expand: true,
					cwd: '<%= src %>/images/',
					src: ['*.{jpg,gif,svg,jpeg,png}'],
					dest: '<%= dist %>/images/'
				}]
			}
		},

		useminPrepare: {
			html: ['<%= src %>/index.html'],
			options: {
				dest: '<%= dist %>'
			}
		},

		usemin: {
			html: ['<%= dist %>/**/*.html', '!<%= src %>/bower_components/**'],
			css: ['<%= dist %>/css/**/*.css'],
			options: {
				dirs: ['<%= dist %>']
			}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['assemble','sass']
			},
			sass: {
				files: ['<%= src %>/scss/**/*.scss'],
				tasks: ['sass']
			},
			assemble: {
				files: ['<%= src %>/html/**/*.{hbs,json}','<%= src %>/html/**/*.json'],
				tasks: ['assemble']
			},
			livereload: {
				files: ['<%= src %>/**/*.html', '!<%= src %>/bower_components/**', '<%= src %>/js/**/*.js', '<%= src %>/css/**/*.css', '<%= src %>/images/**/*.{jpg,gif,svg,jpeg,png}'],
				options: {
					livereload: true
				}
			}
		},

		connect: {
			dev: {
				options: {
					port: 9005,
					base: '<%= src %>/',
					open: true,
					livereload: true, // or portnumber
					hostname: '*'
				}
			},
			dist: {
				options: {
					port: 9006,
					base: '<%= dist %>/',
					open: true,
					livereload: false,
					hostname: '*'
				}
			}
		},

		wiredep: {
			target: {
				src: [
					'<%= src %>/**/*.hbs'
				],
				ignorePath: '../../',
				exclude: [
					'modernizr',
					'jquery-placeholder',
					'jquery.cookie',
					'foundation'
				]
			}
		}

	});

    grunt.registerTask('default', ['serve']);
	grunt.registerTask('serve', ['assemble', 'sass', 'wiredep', 'connect:dev', 'watch']);
	grunt.registerTask('dist', ['clean:dist', 'assemble', 'sass', 'wiredep', 'jshint', 'useminPrepare', 'copy:dist', 'newer:imagemin', 'concat', 'cssmin', 'uglify', 'usemin']);

};