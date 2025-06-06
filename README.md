# ruoyi-element-ai

<div align="center">

  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/element-plus-x/ruoyi-element-ai/blob/main/LICENSE)&emsp;[![Vue 3.5](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js)](https://vuejs.org/)&emsp;[![Vite 5](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)&emsp;[![TypeScript 5.8](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)&emsp;[![GitHub Stars](https://img.shields.io/github/stars/element-plus-x/ruoyi-element-ai?style=social)](https://github.com/element-plus-x/ruoyi-element-ai)&emsp;

</div>

### 🚀 项目亮点

**ruoyi-element-ai** 是基于 **Vue3.5** + **Element-Plus-X** + **TypeScript** 的企业级AI应用模板，搭配 **ruoyi-ai** 后端，快速构建仿豆包/通义的全栈AI项目。

### 💡 核心优势
- 最新技术栈：Vue3.5/Vite5/Pinia3/TypeScript5.8
- 流式交互：Hook-Fetch支持Server-Sent Events
- 企业级规范：ESLint/Stylelint/husky/commitlint全链路校验
- 开箱即用：内置动态路由、状态管理、组件库封装

<div align="center">
<img src="https://cdn.element-plus-x.com/chat/1.webp" calss="element-plus-x-bubble" />&emsp;
</div>

### 🔗 关键链接

| 功能模块         | 说明                          | 链接                                                                 |
|------------------|-------------------------------|----------------------------------------------------------------------|
| 🚀 前端仓库 | Gitee/GitHub 代码仓库(感谢 star🥰爱你爱你😘) | [Gitee](https://gitee.com/he-jiayue/ruoyi-element-ai) <br> [GitHub](https://github.com/element-plus-x/ruoyi-element-ai) |
| 🛠️ 后端仓库 | 待补充（支持Java/Node）        | 待更新                                                               |
| 📚 前端文档 | 开发指南/组件说明              | [快速了解项目](https://chat-docs.element-plus-x.com)                 |
| 📡 在线演示 | 实时交互体验                    | [立即访问](https://chat.element-plus-x.com)                          |

### 🧰 核心功能

- 使用 Vue3.5+ 各种新特性的支持，让开发更有效率
- 采用 Vite6.3+ 作为项目开发、打包工具
- 使用 Pinia3.0+ 作为全局状态管理库，轻量、优雅、易用，集成 Pinia 持久化插件
- 使用 TypeScript5.8+ 增强项目的代码规范和可读性
- 使用 Unocss 预设样式，更快书写简单的样式
- 弃用 Axios (不支持流式请求) 改用 Hook-Fetch (支持流模式，插件化封装，写法极度优雅) 进行全局的请求封装
- 使用 VueRouter 配置动态路由权限拦截、路由懒加载
- 使用 KeepAlive 对页面进行缓存
- 封装了一些好用的组件和Hooks，增强用户交互体验
- 使用   ESLint9+、Stylelint16+ 代码校验规范、同时统一保存格式化代码
- 使用 husky、lint-staged、commitlint、cz-git 规范提交信息

### 📦 安装与运行

```bash
# 克隆项目
# Gitee
git clone https://gitee.com/he-jiayue/ruoyi-element-ai.git
# GitHub
git clone https://github.com/element-plus-x/ruoyi-element-ai.git
cd ruoyi-element-ai

# 安装依赖（推荐pnpm 避免幻影依赖）
pnpm install

# 开发模式
pnpm run dev

# 生产构建
pnpm build

# 代码校验
pnpm lint          # ESLint检测
pnpm lint:stylelint # 样式格式化
pnpm cz            # 规范提交（自动执行lint）
```

### 🌳 目录结构

```text
ruoyi-element-ai
├─ .build                        # Vite 配置项（存放 Vite 构建相关的自定义配置）
├─ .husky                        # husky 配置文件（Git 钩子配置，用于自动化代码检查、格式化等预处理操作）
├─ .vscode                       # VSCode 推荐配置（包含 VSCode 工作区配置、扩展推荐等）
├─ public                        # 静态资源文件（该文件夹不会被打包，用于存放无需编译的资源，如 favicon、robots.txt 等）
├─ src
│  ├─ api                        # API 接口管理（封装后端接口请求，通常包含 Axios 实例和接口函数）
│  ├─ assets                     # 静态资源文件（需打包的资源，如图片、字体文件等，通过 import 引入）
│  ├─ components                 # 全局组件（可复用的组件，如按钮、模态框等，供各页面直接调用）
│  ├─ config                     # 全局配置项（存放项目环境变量、接口地址等可配置参数）
│  ├─ constants                  # 项目常用枚举（定义项目中常用的枚举值，如状态码、权限标识等）
│  ├─ hooks                      # 常用 Hooks 封装（自定义 Hook 函数，用于复用组件逻辑，如数据请求、路由监听等）
│  ├─ layouts                    # 框架布局模块（定义项目整体布局，如顶部导航、侧边栏等）
│  ├─ pages                      # 项目所有页面（存放业务组件，通常一个页面对应一个路由）
│  ├─ routers                    # 路由管理（配置项目路由规则，包含路由守卫、动态路由等）
│  ├─ stores                     # pinia store（状态管理模块，存放应用全局状态）
│  ├─ styles                     # 全局样式文件（包含公共样式变量、混合类、重置样式等）
│  ├─ utils                      # 常用工具库（封装通用工具函数，如日期处理、加密解密、表单验证等）
│  ├─ App.vue                    # 项目主组件（应用顶级组件，包含路由出口和全局布局）
│  └─ main.ts                    # 项目入口文件（应用启动入口，初始化 Vue 实例、路由、状态管理等）
├─ types                         # 全局类型声明（定义项目全局 TypeScript 类型，供各模块引用）
├─ .commitlintrc.cjs             # git 提交规范配置（配置 commit 信息格式校验规则）
├─ .editorconfig                 # 统一不同编辑器的编码风格（跨编辑器的代码样式统一配置）
├─ .env.development              # 开发环境配置（存放开发环境变量，如 API 地址、调试开关等）
├─ .env.production               # 生产环境配置（存放生产环境变量，需注意敏感信息安全）
├─ .eslintrc-auto-import.json    # ESLint 自动导入配置（配置自动导入 Vue 组件/Hooks，避免手动引入）
├─ .gitignore                    # 忽略 git 提交（配置 Git 忽略文件规则，如 node_modules、日志文件等）
├─ .lintstagedrc                 # lint-staged 配置文件（配置仅对暂存文件进行代码检查，提升效率）
├─ .stylelintignore              # 忽略 stylelint 格式化（配置 stylelint 忽略的文件/目录）
├─ .stylelintrc.cjs              # stylelint 样式格式化配置（配置 CSS/LESS/SCSS 样式规范）
├─ eslint.config.js              # Eslint 校验配置文件（配置 JavaScript/TypeScript 代码规范校验规则）
├─ index.html                    # 入口 html（应用的 HTML 模板，包含页面基本结构和 Vite 挂载点）
├─ LICENSE                       # 开源协议文件（声明项目开源协议，如 MIT、Apache 等）
├─ package.json                  # 依赖包管理（记录项目依赖的 npm 包及版本，支持脚本命令）
├─ pnpm-lock.yaml                # 依赖包包版本锁（pnpm 锁文件，锁定依赖版本保证一致性）
├─ README.md                     # README 介绍（项目说明文档，包含功能介绍、快速开始、贡献指南等）
├─ tsconfig.app.json             # TypeScript 应用配置（针对浏览器环境的 TypeScript 编译配置）
├─ tsconfig.json                 # typescript 全局配置（项目整体 TypeScript 配置，继承基础规则）
├─ tsconfig.node.json            # TypeScript Node 配置（针对 Node.js 环境的 TypeScript 编译配置）
├─ uno.config.ts                 # unocss 配置（UnoCSS 原子化样式配置文件，定义自定义样式规则）
└─ vite.config.ts                # vite 全局配置文件（Vite 构建工具的核心配置，包含插件、服务器、打包等配置）
```

### 🤝 社区支持
<div align="center">
<img src="https://cdn.element-plus-x.com/vw-2025-06-06.png" alt="微信交流群" width="180" style="margin: 20px;" />
<p>加入微信交流群，获取最新动态和技术支持</p>

<p>交流群如果过期或者失效，可以添加作者 vx</p>
<img src="https://cdn.element-plus-x.com/element-plus-x-author-vx.png" alt="作者vx" width="180" style="margin: 20px;" />
</div>

### 😍 留下赞赏，助力开源

<div align="center">
<p>开源是为爱发电，但电费我想平摊~~🙊</p>
<p>💌 欢迎扫码赞赏，后续会将赞赏的记录截图附上。感谢你的支持哇 💖</p>
<img src="https://cdn.element-plus-x.com/zs.png" alt="赞赏" width="180" style="margin: 20px;" />
</div>
