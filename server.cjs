
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors')
const server_config = require('./server/config/server.json');
const app_config = require('./app.config.json')

const server = express();

server.use(cors())

server.get('/', (req, res) => {
  var filePath = './server/files/';
  if (req.query.host) {
    app_config.sites.forEach((site)=>{
      site.host.forEach((host)=>{
        if(host==req.query.host)
        {
          filePath += `/${site.name}`
        }
      })
    })
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
  console.log('End page server is listen to port '+app_config.server.port)
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
    console.log(`Front page server ${site.name} is listen to port ${site.port},`
      + ` and the available host is ${site.host.join(',')}`);
  });

});