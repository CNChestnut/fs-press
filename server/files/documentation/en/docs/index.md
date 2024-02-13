---
title:
  Text: "FS-Press Document"
  keepSite Title: true
---

## How to deploy

- Rear end part

    [FS-Press-Server Documentation](./fs-press-server/)

- Front part

    - Scheme branch 1 (not recommended)

        1. Extract the archive [Release](https://github.com/CNChestnut/fs-press/releases) in to the root directory of your Web site.

        2. Search `http://127.0.0.1:62710/main-site` and replace in the `JavaScript(JS)` files `/assets/` under.

        3. Direct all access to

    - Scheme branch 2
    
        1. Open the terminal
            ```bash
            git clone https://github.com/CNChestnut/fs-press.git
            cd ./fs-press/
            npm install
            npm run build
            ```

        2. Before building, you can edit `fs-press/src/app.config.json` the configuration file.
            ```json
            {
                "server_host":"http://127.0.0.1:62710" //服务器路径
            }
            ```
            And then
            ```bash
            npm run build
            ```

        3. The files under the directory are then `/fs-press/dist` added to the root directory of the Web site.
        
        4. Direct all access to

            For example, in Nginx, the configuration is
            ```config
            location ~{
                try_files $ $/ /index.html;
            }
            ```
    - About `server_host` the configuration of the
        
        When the backend is not turned on `multi_site`, you can configure it this way
        ```json
        "server":"http://127.0.0.1:62710"
        ```
        If the backend is turned on `multi_site`, you can configure it like this
        ```json
        "server":"http://127.0.0.1:62710/{site-name}"
        ```
        For example
        ```json
        "server":"http://127.0.0.1:62710/main-site"
        ```
        