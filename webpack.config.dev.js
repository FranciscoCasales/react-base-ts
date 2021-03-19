const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotEnv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
    // Descomentar para configurar short imports
    // alias: {
    //   '@utils': path.resolve(__dirname, 'src/utils'),
    //   '@templates': path.resolve(__dirname, 'src/templates'),
    //   '@styles': path.resolve(__dirname, 'src/styles'),
    //   '@images': path.resolve(__dirname, 'src/assets/images'),
    // }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // Para configurar el cargado de imagenes descomentar
      // {
      //   test: /\.png/,
      //   type: 'asset/resource',
      // },
      // Para configurar la carga de fuentes optimizadas
      // {
      //   test: /\.woff|woff2$/,
      //   use: {
      //     loader: 'url-loader',
      //     options: {
      //       limit: 10000,
      //       mimetype: "application/font-woff",
      //       name: "[name].[contenthash].[ext]",
      //       outputPath: "./assets/fonts/",
      //       publicPath: "../assets/fonts/",
      //       esModule: false
      //     }
      //   }
      // }
      {
        test: /\.html$/,
        use: [
          { loader: 'html-loader' }
        ]
      },
      {
        test: /\.s?css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
    new DotEnv(),
    new CleanWebpackPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3006
  }
}