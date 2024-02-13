---
title:
  Text: "FS-Press-Server Document"
  keepSite Title: true
---

## FS-Press-Server

### Deploy


```bash
git clone https://github.com/CNChestnut/fs-press-server.git
cd ./fs-press-server
npm install
npm run run
```

### Configuration file


```json
{
    "port":62710, //端口号
    "i18n":true, //是否开启国际化
    "multi_site":true  //是否开启多站点
}
```

### Edit the file

#### Multi-Site & Internationalization

The file is located in the directory `/files[/site][/language]/{path}`.

The above two parameters will be inserted automatically when you enable `i18n` , `multi_site` the configuration.

####  `path` Parameter

For example, the `server_host` front-end configuration is

```json
{
    "server_host":"http://fs-press.server",
    "language":"zh-CN",
}
```
When..

-  `path` : `fs.press` -> `/files/main-site/zh-CN/index.md`

-  `path` : `fs.press/docs` -> `/files/main-site/zh-CN/docs/index.md`
