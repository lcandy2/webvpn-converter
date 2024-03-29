// See https://github.com/eonarheim/webpack-bookmarklet/blob/main/webpack.config.js

const path = require('path');
const webpack = require('webpack');

// Modified for webpack v5: See https://stackoverflow.com/a/46920791/839595
class AssetToBookmarkletPlugin {
  pluginName = 'AssetToBookmarkletPlugin';

  apply(compiler) {
    compiler.hooks.thisCompilation.tap(this.pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: this.pluginName,
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        (assets) => {
          // Emit a new .bookmarklet and a corresponding .js module
          for (const assetName in assets) {
            const asset = assets[assetName];
            const bookmarkletContent =
              'javascript:' +
              encodeURIComponent('(function(){' + asset.source() + '})()');
            // Emit .bookmarklet file
            // compilation.emitAsset(
            //   assetName + '.bookmarklet',
            //   new webpack.sources.RawSource(bookmarkletContent),
            // );
            // Emit .js module file
            // const jsModuleContent = `const bookmarklet = \`${bookmarkletContent}\`;\nexport default bookmarklet;`;
            // compilation.emitAsset(
            //   assetName + '.bookmarklet.export.js',
            //   new webpack.sources.RawSource(jsModuleContent),
            // );
            // Emit .ts module file
            const tsModuleContent = `const bookmarklet:string = \`${bookmarkletContent}\`;\nexport default bookmarklet;`;
            compilation.emitAsset(
              assetName + '.bookmarklet.export.ts',
              new webpack.sources.RawSource(tsModuleContent),
            );
          }
        },
      );
    });
  }
}

module.exports = {
  entry: {
    index: './index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '~': path.resolve(__dirname, '../../'),
      '@': path.resolve(__dirname, '../../src/'),
    },
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 0 }, // 0 = always inline resource
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { minimize: true }, // Minify CSS as well
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                noEmit: false,
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new AssetToBookmarkletPlugin()],
};
