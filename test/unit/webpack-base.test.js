/**
 * Created by swy on 2019/11/8.
 */

const assert = require("assert");

describe('webpack.base.js test care', () => {
  const baseConfig = require("../../lib/webpack.base.js");
  console.log(baseConfig)
  it('entry', () => {
    assert.equal(baseConfig.entry.index, 'E:/工作/2019-08-05/builder-webpack/test/smoke/template/src/index/index.js');
    assert.equal(baseConfig.entry.search, 'E:/工作/2019-08-05/builder-webpack/test/smoke/template/src/search/index.js');
  })
})