# 代码贡献指南

## 搭建开发环境

* 安装Node(>= v14.x)、Visual Studio Code

## 分支创建规则以及使用
### 添加项目
  - `git clone url` 到本地添加项目文件
  - v3版本处于开发阶段，故暂无主分支，公共开发分支为 `v3-dev`，个人分支命名为 `v3-dev-xxx`
  - 进入本地 git pull -p 将所有远程分支拉取到本地
### 开发分支创建
  - `git branch -all`         - 查看所有分支，包括本地和远程分支
  - `git checkout -b 分支名`  - 在本地创建并且跳到该分支
  - `git checkout 分支名`     - 切换分支
### 分支代码提交
  - 将代码从工作区【添加】至暂存区       `git add .` (全部) / `git add 文件路径` (部分)
  - 将代码从暂存区【提交】至本地分支     `git commit -m "提交信息" `
  - 将本地分支代码【推送】至远程分支     `git push `
  - 新建的本地分支第一次推送需要 `git push --set-upstream origin 分支名`，这样远程仓库就会出现你的分支
  - 推送本地分支代码和合并代码之前必须 `git pull` 拉取远程分支代码，有代码冲突必须先解决冲突才能进行推送或合并操作
  - 【个人分支】与【公共开发分支】合并前，请一定需要把个人分支的commit合并，再与公共开发分支进行merge
  
## 开发规范

### 导入规范
项目已配置下列路径别名，在ts文件中跨父文件夹的导入请使用别名导入:
* `@/` : `src/js/`
* `@css/` : `src/js/`

### js开发规范
#### 功能模块
* 功能模块是实现播放器基础功能的模块，位于 `src/js/` 文件夹下
* 功能模块包含下列部分
  * `Danmaku` - 弹幕模块
  * `Events` - 事件模块
  * `Mode` - 播放器模式
  * `Video` - 视频模块

#### 界面模块
* 界面模块是构成播放器操作界面的模块，位于 `src/js/ui/` 文件夹下
* 界面模块包含下列部分
  * `Controller` - 底部控制栏
  * `Footbar` - 底栏，用于弹幕发送相关
  * `Header` - 顶部信息栏(尚未开发)
  * `Hotkey` - 快捷键控制
  * `Modal` - 模态框(尚未开发)
  * `Toast` - toast通知(尚未开发)
  * `Side` - 侧边栏(尚未开发)
  * `Loading` - 播放器加载画面(尚未开发)
  * `VideoStatus` - 视频状态显示(尚未开发)
  * `ContextMenu` - 右键菜单(尚未开发)
* 界面模块包含DOM模板时，应先使用
  ``` typescript
    const template = html`...`
  ```
  定义一个模板，再声明模块，并添加绑定
* 类实例属性请使用camelCase命名法命名，并遵循下列规则：
  ``` typescript
    class Mywidget {
      // ...
      constructor(player, container) {
        // 一般属性
        this.myValue = "#233333"
        // 容器使用container，根元素使用el
        this.container = container
        this.el = this.container.querySelector(`.${classPrefix}-mywidget`)!
        // 子元素需要在开头加$
        this.$button = this.el.querySelector(`.${classPrefix}-mywidget-button`)!
        this.$colorInput = this.el.querySelector(`.${classPrefix}-mywidget-color-input`)!
      }
    }
  ```

#### 插件模块
* 插件是拓展播放器功能和界面操作的模块，没有这些模块播放器也能正常运行
* 内置插件位于 `src/js/plugins` 文件夹下，目前含有下列内置插件
  * `DanmakuList` - 弹幕列表(尚未开发)
* 外置插件可通过播放器实例化参数配置引入

#### 工具函数

#### 其他
* 类型定义请写在`src/js/types.ts`文件内
* 枚举请写在`src/js/enum.ts`文件内

### 模板规范
待补充

### CSS开发规范
待补充


## 项目结构
```
mfuns-player
├─.vscode       // vscode编辑器配置
├─demo/         // 演示用文件
├─dist/         // 编译文件
├─node_modules/ // node模块
├─src/          // 源代码
| ├─css/          // 样式文件
| | ├─ui/             // 部件样式
| | ├─font-icon.scss  // 字体图标文件
| | ├─player.scss     // 播放器主体样式
| | ├─theme.scss      // 样式变量
| | └─index.scss      // 主体css文件
| └─js/           // Typescript文件
|   ├─Danmaku/      // 弹幕模块
|   ├─Events/       // 事件模块
|   ├─Mode/         // 播放器模式
|   ├─Video/        // 视频模块
|   ├─plugins/      // 插件相关
|   ├─ui/           // 播放器界面相关
|   | ├─components/   // 组件
|   | ├─Controller/   // 控制栏
|   | ├─Footbar/      // 底栏
|   | └─Template.ts   // 播放器框架模板
|   ├─utils/        // 工具函数
|   ├─const.ts      // 播放器定义常量
|   ├─enum.ts       // 播放器定义枚举类型
|   ├─types.ts      // 类型定义
|   ├─player.ts     // 播放器主体
|   └─index.ts      // 主体ts文件
├─globals.d.ts        // 全局类型声明文件
├─package.json        // 包配置文件
├─tsconfig.json       // Typescript配置文件
└─webpack.config.js   // Webpack配置文件

```