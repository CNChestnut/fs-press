---
title:
  text: "FS-Press 文档"
  keepSiteTitle: true
---

## 怎么部署

[一键部署 Demo](./demo)

### 构建

#### 获取源代码

1. 打开终端，输入
```bash
git clone https://github.com/CNChestnut/fs-press.git
cd ./fs-press/
```

#### 修改配置文件
  
1. 配置文件位于 `/app.config.json`
2. 配置文件格式如下
```json
{
    "sites":[ //站点
        {
            "port":52110, //监听的端口
            "name":"main", //站点名称,也对应着站点文件夹名
            "host":[  //主机名，FS-Press 服务端通过主机名返回不同的内容
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
    "server":{  //服务端
        "host":"http://localhost", // 协议+服务端 （准确来说是完整的 URL 去掉端口的部分）
        "port":62710 //监听的端口
    }
}
```

#### 生成前端文件

1. 打开终端
 ```bash\
npm install
npm run build
```

#### 运行服务器
1. 打开终端
```bash
npm run server
```

#### 编辑文件

##### 文件目录

文件位于目录 `/server/files/[site.name]/` 下。

##### 路由

- `path` : `fs.press` -> `/server/files/[site.name]/[language]/index.md`

- `path` : `fs.press/docs` -> `/server/files/[site.name]/[language]/docs/index.md`
