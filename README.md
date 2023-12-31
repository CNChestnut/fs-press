# openNUT FS Press

这是一个基于文件系统的动态网站生成器。

半成品

## 怎么部署

- 前端部分

    1. 将 [Release](https://github.com/CNChestnut/fs-press/releases) 中的压缩包解压到网站根目录。

    2. 将所有访问指向 `index.html`

- 后端部分

    1. 将 [服务端](https://github.com/CNChestnut/fs-press-server/) 部署到服务器。

    2. 使用 `npm run start` 运行项目

- 修改文档

    目录: `[fs-press-server]/files/`

    前端的访问将自动路由至 `files`

    如 
    
    - `fs.press` -> `$/files/index.md`

    - `fs.press/about` -> `$/files/about/index.md`

- 大功告成 

当访问时，应用会自动 `fetch 127.0.0.1:62710` ，你可在 `/assets/` 中的 `JavaScript` 文件中搜索 `127.0.0.1:62700` 并修改。
