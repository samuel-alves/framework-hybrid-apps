# Readme
[project description]

## Guide lines
Please follow the language guide lines:
- [JS Guide](https://google.github.io/styleguide/jsguide.html)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml)


## Technologies
__Back-end__
- [Node.js](http://nodejs.org)
- [GruntJS](https://gruntjs.com/)
- [JSHint](http://jshint.com/)
- [Cordova](https://cordova.apache.org/)

__Front-end__
- [bower](https://bower.io)
- [SASS](http://sass-lang.com/install)

__Other__
- [ADB](https://developer.android.com/studio/command-line/adb.html)

### Build details
```sh
#!/bin/bash

# ----------------------------------------------------------------------
# SETUP
# ----------------------------------------------------------------------
# 1. create project directory
mkdir framework-hybrid-apps
cd framework-hybrid-apps

# 2. init node project
npm init

# 3. install packages/dependencies
# 4. create Gruntfile

# 5. create application source directory
mkdir src


# ----------------------------------------------------------------------
# CORDOVA
# ----------------------------------------------------------------------
# new cordova project
# cordova create <directoryname> <appid> <appname>
cordova create app pt.demo.hybridApp HybridApp

# # cordova add platforms
# cd app
# cordova platform add android
```

We end up with the following directory structure:
```
.
├── app                (The directory that contains the Cordova project  )
│   ├── ...            (Cordova directories and files                    )
│   └── www            (The directory of our application.                )
|                      (It's a classical web directory.                  )
├── bower_components   (The Bower directory for components/llibraries    )
├── node_modules       (The Nodejs directory for modules                 )
├── src                (The directory for our source code                )
    ├── img            (App images directory                             )
    ├── js             (App JS directory                                 )
    ├── scss           (App SASS directory                               )
    ├── templates      (App HTML templates                               )
    └── index.html     (App index                                        )
├── bower.json         (Bower project configuration                      )
├── Gruntfile.js       (The build file for Grunt                         )
└── package.json       (The file that allow NodeJS to install all we need)
                       (Project configurations                           )
```
