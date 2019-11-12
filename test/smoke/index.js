/**
 * Created by swy on 2019/11/7.
 */
const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
  timeout: '10000ms'
})

// 进入到template目录里
process.chdir(path.join(__dirname, 'template'));

// 删除template里dist目录
rimraf('./dist', () => {
  const prodConfig = require("../../lib/webpack.prod.js");

  // 运行webpack.prod.js配置
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.log(err);
      process.exit(2);
    }
    // 打印成功信息
    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false
    }))

    console.log('Wbpack build sucess, begin run test');
    mocha.addFile(path.join(__dirname, 'html-test.js'));
    mocha.addFile(path.join(__dirname, 'css-js-test.js'));
    mocha.run();
  });
});