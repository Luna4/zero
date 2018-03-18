import path from 'path'
import webpack from 'webpack'
// import autoprefixer from 'autoprefixer'
// import StyleLintPlugin from 'stylelint-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

// const commonChunks = {
//   vendor: [
//     'react',
//     'react-dom',
//     'react-redux',
//     'react-router',
//     'react-router-redux'
//   ]
// }
// const context = path.resolve(__dirname, '..')

const jsOutputDirectory = 'js'

const resolve = {
  modules: ['src', 'node_modules']
}
const entry = {
  main: [
    path.join(__dirname, './src/client.js')
  ],
  vendor: [
    'react',
    'react-dom'
  ]
}
const plugins = [
  // new webpack.LoaderOptionsPlugin({
  //   options: {
  //     postcss: [autoprefixer]
  //   }
  // }),
  // new StyleLintPlugin({
  //   files: '**/*.less',
  //   syntax: 'less',
  //   failOnError: false
  // }),
  new webpack.DefinePlugin({
    __DEVTOOLS__: true
  }),
  new HtmlWebpackPlugin({
    title: 'Home',
    template: './src/index.html',
    inject: 'body',
    filename: 'index.html'
  }),
  new webpack.HotModuleReplacementPlugin()
]

const output = {
  path: path.join(__dirname, '/dist/'),
  filename: `${jsOutputDirectory}/[name].js`,
  chunkFilename: `${jsOutputDirectory}/[name].js`,
  publicPath: '/'
}

const moduleConfig = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        { loader: 'babel-loader' },
        { loader: 'eslint-loader' }
      ]
    },
    {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]_[hash:base64:4]'
          }
        },
        { loader: 'postcss-loader' }
      ]
    },
    {
      test: /\.(sass|scss)$/i,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    },
    {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      use: [
        {
          loader: 'file-loader'
        }
      ]
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      ]
    }
  ]
}

// if (commonChunks) {
  // const chunkKeys = Object.keys(commonChunks)
  //
  // chunkKeys.forEach((key) => {
  //   entry[key] = commonChunks[key]
  // })
  // plugins.push(
  //   new webpack.optimize.CommonsChunkPlugin({ names: chunkKeys })
  // )
// }

module.exports = {
  mode: 'development',
  devtool: false,
  module: moduleConfig,
  // resolveLoader: {
  //   modules: [path.join(__dirname, 'node_modules')]
  // },
  entry,
  output,
  plugins,
  resolve,
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://localhost:5000/',
        changeOrigin: true
      }
    }
  }
}
