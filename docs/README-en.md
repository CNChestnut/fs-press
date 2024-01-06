# openNUT FS Press

Version: `1.3.0`

`fs-press-server` compatibility version: `2.1.0`.

## How to deploy

- Front-end part
    
    1. Open a terminal.
        ``bash
        git clone https://github.com/CNChestnut/fs-press.git
        cd . /fs-press/
        npm install
        npm run build
        ```

    2. Before building, you can edit the `fs-press/src/app.config.json` configuration file
        ```json
        {
            "server_host": "http://127.0.0.1:62710" //server path
        }
        ```
        And then
        ``bash
        npm run build
        ```
    3. Then add the files in the `/fs-press/dist` directory to the root of the site.

    4. Point all access to `index.html`.

- The back-end part

    1. Deploy the [server](https://github.com/CNChestnut/fs-press-server/) to the server. 2.

    2. Run the project using `npm run start`.

- Modify the documentation

    Directory: `[fs-press-server]/files/'

    Front-end access will be automatically routed to `files`.

    e.g. 
    
    - `fs.press` -> `$/files/index.md`

    - `fs.press/about` -> `$/files/about/index.md`

- That's it.