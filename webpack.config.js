const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV === "production";
const cssLoader = isProd ? MiniCssExtractPlugin.loader : "style-loader";

const APP_PATH = path.resolve(__dirname, "src");
const config = {
  entry: {
    main: ["whatwg-fetch", "./src/index.ts"],
  },
  output: {
    publicPath: "",
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[hash].bundle.js",
    chunkFilename: "js/[name][chunkhash].js",
  },
  mode: isProd ? "production" : "development",
  devtool: isProd ? null : "source-map",
  resolve: {
    alias: {
      "@": `${__dirname}/src`,
    },
    // 集成省略扩展名
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx", ".less"],
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        exclude: /^node_modules$/,
        use: ["ts-loader"],
        include: [APP_PATH],
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /^node_modules$/,
        use: ["babel-loader"],
        include: [APP_PATH],
      },
      {
        test: /\.less$/,
        use: [cssLoader, {
          loader: "css-loader",
          options: {
            modules: true,
          },
        }, {
          loader: "less-loader",
          options: {
            lessOptions: {
              javascriptEnabled: true,
            }
          }
        }],
      },
      {
        test: /\.global\.less$/,
        use: [cssLoader, {
          loader: "css-loader",
        }, {
          loader: "less-loader",
          options: {
            lessOptions: {
              javascriptEnabled: true,
            }
          }
        }],
      },
      {//图片
        test: /\.(png|jpg|gif|svg|ico)$/i,//i不区分大小写
        use: [
            {
                loader: 'file-loader',
                options: {
                    outputPath: './static/img/'//图片输出位置
                }
            },
        ]
    },
    {//字体图标
        test: /\.(eot|woff|woff2|ttf)$/i,
        use: {
            loader: 'url-loader',
            options: {
                limit: 30000,
                outputPath: './static/font/'//图片输出位置
            }
        }
    },
    ],
  },
  devServer: {
    historyApiFallback: true,
    port: 9009,
    proxy: {
      "/": { target: "http://localhost:3000", secure: false },
    },
  },
  optimization: {
    moduleIds: 'deterministic',
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    runtimeChunk: {
      name: "manifest",
    },

    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: "vendor",
          chunks: "initial",
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/,
        },
        // 处理异步chunk
        "async-vendors": {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          chunks: "async",
          name: "async-vendors",
        },
        antd: {
          name: "chunk-antd", // 单独将 antd 拆包
          priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          test: /[\/]node_modules[\/]antd[\/]/,
        },
        styles: {
          name: "styles",
          test: /\.(less|css)$/,
          chunks: "all",
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "快速上币管理平台",
      inject: "body",
      filename: "index.html",
      template: path.resolve(__dirname, "index.html"),
      // chunks: ['main','vandor']
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name][contenthash].css",
      chunkFilename: "[id][contenthash].css",
    }),
    new CleanWebpackPlugin(),
  ],
};
module.exports = config;
