import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

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
  new webpack.DefinePlugin({
    __DEVTOOLS__: true,
    'process.env': {
      'APP_ENV': JSON.stringify(process.env.APP_ENV)
    }
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
        'postcss-loader',
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

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: moduleConfig,
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
    overlay: true,
    port: 8008,
    stats: {
      color: true
    },
    proxy: {
      '/api/*': {
        target: 'http://localhost:5000/',
        changeOrigin: true
      }
    }
  }
}
