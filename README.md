Gulp starter which will helps you for multiple tasks:
- concatenate and transpile ES6 files into Javascript
- concatenate and transpile stylus files into CSS
- generate all the needed favicons
- generate sprites from SVG and PNG files


Installation
-----

### Node

Because tasks are written with ES6, you need a recent version of Node.
To update node, you can do it with NPM:

```sudo npm cache clean -f
sudo npm install -g n
sudo n stable```

### Images tools

In order to work with pictures, you also need some tools to modify them: ImageMagick and GraphicsMagick.
You can install them via Homebrew.

To install Homebrew:
`ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

Then you can run:
```brew install imagemagick
brew install graphicsmagick```

### Install the packages

Now just run:

`npm install`



Configuration
-----

All important parameters are ruled in a config file in `./task-runner/config.yml`.
For each task, you have an array of objects per file you want to compile. It can be usefull if you need different output for a desktop version and a mobile version for example.