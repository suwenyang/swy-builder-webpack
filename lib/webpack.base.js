/**
 * Created by swy on 2019/11/7.
 */
const autoprefixer = require('autoprefixer');
const glob = require('glob');
const path = require('path');
// 生成单个css文件插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 打包目录清理
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// html生成插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 命令行信息显示优化
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// 运行时的根目录
const projectRoot = process.cwd();

const setMPA = () => {
  const entry = {};
  const htmlWbpackPlugins = [];

  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));

  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    // 'E:/工作/2019-08-05/webpack-project/src/index/index.js'
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];

    entry[pageName] = entryFile;

    return htmlWbpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.resolve(projectRoot, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: ['vendors', pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      }),
    );
  });

  return {
    entry,
    htmlWbpackPlugins,
  };
};
const { entry, htmlWbpackPlugins } = setMPA();
module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer(),
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    // 错误捕获和处理
    function doneErrorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          process.exit(1);
        }
      });
    },
  ].concat(htmlWbpackPlugins),
  stats: 'errors-only', // 只显示错误信息
};
