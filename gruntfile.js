module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      html: {
        files: ['src/*.html'],
        tasks: ['copy:html', 'replace:dev'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['src/assets/css/**/*.css'],
        tasks: ['copy:css', 'replace:dev'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['src/assets/js/*.js'],
        tasks: ['copy:js', 'replace:dev'],
        options: {
          livereload: true
        }
      },
      img: {
        files: ['src/assets/images/**/*.{png,jpg,webp,jpeg}'],
        tasks: ['copy:img'],
        options: {
          livereload: true
        }
      }
    },
    replace: {
      dev: {
        options: {
          log: true,
          verbose: true,
          reportError: true,
          patterns: [
            {
              match: /assets\/css\/assimox\.css/g,
              replacement: 'assets/css/assimox.css'
            },
            {
              match: /assets\/css\/assimox-responsive\.css/g,
              replacement: 'assets/css/assimox-responsive.css'
            },
            {
              match: /assets\/js\/assimox\.js/g,
              replacement: 'assets/js/assimox.js'
            }
          ]
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.html'],
          dest: 'src/'
        }]
      },
      dist: {
        options: {
          reportError: true,
          patterns: [
            {
              match: /assets\/css\/assimox\.css/g,
              replacement: 'assets/css/assimox.min.css'
            },
            {
              match: /assets\/css\/assimox-responsive\.css/g,
              replacement: 'assets/css/assimox-responsive.min.css'
            },
            {
              match: /assets\/js\/assimox\.js/g,
              replace: 'assets/js/main.min.js'
            },
            {
              match: /index\.html/g,
              replacement: '/'
            },
            {
              match: /about\.html/g,
              replacement: '/sobre'
            },
            {
              match: /services\.html/g,
              replacement: '/servicos'
            },
            {
              match: /work\.html/g,
              replacement: '/servicos'
            },
            {
              match: /contact\.html/g,
              replacement: '/contato'
            },
          ]
        },
        files: [{
          expand: true,
          cwd: 'prebuild',
          src: ['*.html'],
          dest: 'dist/'
        }]
      }
    },
    uglify: {
      options: {
        mangle: true,
        compress: true,
      },
      target: {
        files: {
          'dist/assets/js/main.min.js': ['src/assets/js/assimox.js']
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: ['*.html'],
          dest: 'prebuild/',
          ext: '.html'
        }]
      },
    },
    clean: ['prebuild/'],
    cssmin: {
      options: {
        mergeIntoShorthands: true,
        roundingPrecision: -1,
        sourceMap: true,
      },
      target: {
        files: [{
          expand: true,
          cwd: 'src/assets/css', 
          src: ['*.css', '!*min.css'],
          dest: 'dist/assets/css',
          ext: '.min.css'
        }]
      }
    },
    imagemin: {
      static: {
        options: {
          optimizationLevel: 5,
        },
        files: [{
          expand: true,
          cwd: 'src/assets/images/',
          src: ['**/*.png', '**/*.jpg', '**/*.webp', '**/*.jpeg'],
          dest: 'dist/assets/images'
        }]
      }
    },
    copy: {
      assets: {
        expand: true,
        cwd: 'src/assets/',
        src: ['**/*'],
        dest: 'dev/assets/'
      },
      html: {
        expand: true,
        cwd: 'src/',
        src: ['*.html'],
        dest: 'dev/'
      },
      css: {
        expand: true,
        cwd: 'src/assets/css',
        src: ['**/*.css', '!**/*.min.css'],
        dest: 'dev/assets/css'
      },
      js: {
        expand: true,
        cwd: 'src/assets/js',
        src: ['*.js'],
        dest: 'dev/assets/js'
      },
      img: {
        expand: true,
        cwd: 'src/assets/images',
        src: ['**/*.{png,jpg,webp}'],
        dest: 'dev/assets/images'
      },
      libs: {
        expand: true,
        cwd: 'src/assets/vendors',
        src: '**/*',
        dest: 'dist/assets/vendors'
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-replace')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-htmlmin')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-imagemin')

  grunt.registerTask('default', ['watch'])
  grunt.registerTask('build', [
    'uglify', 
    'copy', 
    'htmlmin:dist',
    'cssmin', 
    'imagemin', 
    'replace:dist', 
    'clean'
  ]);
}
