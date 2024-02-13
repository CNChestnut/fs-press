
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors')
const server_config = require('./server/config/server.json');
const app_config = require('./src/app.config.json')

const server = express();

server.use(cors())

server.get('/:site', (req, res) => {
  console.log('aa')
  var filePath = './server/files/';
  if (req.params.site) {
    filePath += `/${req.params.site}`;
  }
  if (req.query.language) {
    if (server_config.i18n) {
      filePath += `/${req.query.language}`;
    }
    else {
      res.send({ "i18n": false });
    }
  }
  filePath += `/${req.query.file}`;
  fs.readFile(filePath, 'utf8', (err, data) => {
    console.log({ "date": Date(), "path": filePath, "query": req.query });
    if (err) {
      if (err.code == 'ENOENT') {
        res.send({ "exist": false });
        return
      }
      return
    };
    res.send(data);
  });
})

server.listen(app_config.server.port,()=>{
  console.log('server on '+app_config.server.port)
})

var apps = {}
app_config.sites.forEach(site => {

  apps[site.name] = express()

  apps[site.name].use(express.static(path.join(__dirname, './dist')));
  
  // 所有请求都返回index.html
  apps[site.name].get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
  });
  
  // 监听端口
  apps[site.name].listen(site.port, () => {
    console.log(`Server is running on port ${site.port}`);
  });

});