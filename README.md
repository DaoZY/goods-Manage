
#### 功能结构
```
- 全局错误日志记录
- vuex持久化存储
- 主题色切换
- 锁屏
- 数据展示
- 登录/注销
 - 用户名登录
 - 验证码登录
- 权限验证
- 第三方网站嵌套
- CRUD(增删改查)
- FORM(动态生成)
- 阿里巴巴图标库(在线调用)
- 表格树
- 引导页
- 更多功能开在开发
```


#### 开发
```bash
# 克隆项目
git clone http://172.30.10.80/front-framework/app-example.git

# 进入项目
cd app-example

# 安装依赖
npm install --registry=https://172.30.10.81

# 启动服务
npm run dev
```

#### 调试与发布
```bash
# 构建测试环境
npm run dev

# 构建生成环境
npm run build

# 构建SSR渲染页面
npm run start

```

#### 其它
```bash
# 代码检测
npm run lint

# 单元测试
npm run karma

# 构建SSR客户端代码
npm run build:client

# 构建SSR服务端端代码
npm run build:server
```
