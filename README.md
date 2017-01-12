
# apc-note
一个异常简洁的笔记应用，一个让你爱不释手的笔记应用，遇上我是你的荣幸。


## 项目安装

* `git clone https://github.com/ubuntuvim/apc-note.git`
* `cd ape-note`
* `npm install`
* `bower install`

后2条命令用于安装项目所依赖的插件，这个过程可能比较慢，主要原因是要从外国的服务器上下载文件。如果安装不成功或者安装非常可以修改npm的镜像为淘宝的npm镜像（[修改方法](https://cnodejs.org/topic/4f9904f9407edba21468f31e)）。

## 运行项目

* 在项目目录下执行命令`ember serve`启动项目
* 访问[http://localhost:4200](http://localhost:4200).

### 打包项目

* `ember build` (development)
* `ember build --environment production` (production)

## 发布

如何发布项目到自己的服务器请参考下面地址的说明。

[发布说明](https://github.com/ubuntuvim/study-note/blob/master/%E5%85%B6%E4%BB%96%E7%AC%94%E8%AE%B0/%E9%83%A8%E7%BD%B2Ember%E9%A1%B9%E7%9B%AE%E5%88%B0Tomcat.md)


## 感谢

### UI

1. 猿笔记基于[bootstrap](http://www.bootcss.com/)开发，bootstrap是什么我就不啰嗦了，做前端的应该都知道它。
2. [ember-bootstrap](https://www.npmjs.com/package/ember-bootstrap)一个封装了bootstrap的ember组件库，有现成的直接用。

### 后端服务

1. 使用[wildember](https://github.com/ubuntuvim/wildember)作为连接野狗的适配器
2. [野狗](https://www.wilddog.com/)是国内非常棒的实时服务提供商，它跟谷歌的[firebase](https://www.firebase.com)非常类似。
