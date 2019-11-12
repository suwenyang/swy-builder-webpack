/**
 * Created by swy on 2019/11/8.
 */

const path = require("path");

process.chdir(path.join(__dirname, "smoke/template"));

describe('builder-webpack test care', () => {
  require('./unit/webpack-base.test');
})