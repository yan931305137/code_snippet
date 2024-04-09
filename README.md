
## 准备

本地环境需要安装 [node](http://nodejs.org/)

项目的技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/)

## 开发
```bash
    # 安装依赖
    npm install

    //or # 建议不要用cnpm 安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
    npm install --registry=https://registry.npm.taobao.org

    # 本地开发 开启服务
    npm run dev
```
浏览器访问 http://localhost:8080

## 发布
```bash
    # 构建生成环境,复制生成的dist到server即可
    npm run build
```


## License

MIT

