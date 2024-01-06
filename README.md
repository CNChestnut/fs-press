
# openNUT FS Press

[English Version](./docs/README-en.md)

版本:`1.3.0`

`fs-press-server` 兼容性版本：`2.1.0`

## 怎么部署

- 前端部分
    
    1. 打开终端
        ```bash
        git clone https://github.com/CNChestnut/fs-press.git
        cd ./fs-press/
        npm install
        npm run build
        ```

    2. 在构建前，你可以编辑 `fs-press/src/app.config.json` 配置文件
        ```json
        {
            "server_host":"http://127.0.0.1:62710" //服务器路径
        }
        ```
        然后再
        ```bash
        npm run build
        ```
    3. 随后将 `/fs-press/dist` 目录下的文件添加到网站根目录。

    4. 将所有访问指向 `index.html`

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