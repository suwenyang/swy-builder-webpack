/**
 * Created by swy on 2019/11/6.
 */

if (typeof window === 'undefined') {
  global.window = {}
}
const fs = require("fs");
const path = require("path");
const express = require("express");
const { renderToString } = require("react-dom/server");
const SSR = require("../dist/search-server");
const template = fs.readFileSync(path.join(__dirname, "../dist/search.html"), "UTF-8");
const data = require("./data.json");
const server = (port) => {
  const app = express();

  app.use(express.static('dist'));

  app.get('/search', (req, res) => {
    const html = renderMarkup(renderToString(SSR))
    res.status(200).send(html);
  })

  app.listen(port, () => {
    console.log("Server is running on pport:" + port);
  })
};

server(process.env.PORT || 3000);
const dataStr = JSON.stringify(data);
const renderMarkup = (str) => {
  return template.replace("<!--HTML_PLACEHOLDER-->", str)
    .replace("<!--INITIAL_DATA_PLACEHOLDER-->", "<script>window.__initial_data="+ dataStr +"</script>");
};