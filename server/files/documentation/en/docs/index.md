---
title:
   text: "FS-Press Documentation"
   keepSiteTitle: true
---

## How to deploy

[One-click deployment Demo](/docs/demo/)

### Construct

#### Get source code

1. Open the terminal and enter
```bash
git clone https://github.com/CNChestnut/fs-press.git
cd ./fs-press/
```

#### Modify configuration file
  
1. The configuration file is located at `/app.config.json`
2. The configuration file format is as follows
```json
{
     "sites":[ //sites
         {
             "port":52110, //Listening port
             "name":"main", //site name, also corresponds to the site folder name
             "host":[ //Host name, FS-Press server returns different content through the host name
                 "localhost"
             ]
         },
         {
             "port":52111,
             "name":"documentation",
             "host":[
                 "127.0.0.1"
             ]
         }
     ],
     "server":{ //server
         "host":"http://localhost", // Protocol + server (to be precise, the complete URL minus the port part)
         "port":62710 //Listening port
     }
}
```

#### Generate front-end files

1. Open the terminal
  ```bash\
npm install
npm run build
```

#### Run the server
1. Open the terminal
```bash
npm run server
```

#### Edit file

##### File Directory

The files are located under the directory `/server/files/[site.name]/`.

##### Routing

- `path` : `fs.press` -> `/server/files/[site.name]/[language]/index.md`

- `path` : `fs.press/docs` -> `/server/files/[site.name]/[language]/docs/index.md`