# 望潮论坛

#### 介绍
这是一个以React + NodeJs为核心搭建的小型论坛系统，功能尚在健全

#### 软件架构
前端：React

后端：NodeJs + Express

数据库：Mysql

#### 文件结构

hopeDamp_froumn_express: 后端项目文件夹

hopeDamp_froumn_web: 前端项目文件夹

#### 启动项目

* 使用Mysql 5.7 创建数据库（名称：hopedamp_froumn，字符集：`UTF8mb4`）并将项目根目录下的hopedamp_froumn.sql 文件导入到数据库中
* 进入hopeDamp_froumn_express文件夹根目录，打开控制台执行`npm install`下包，然后使用`node app.js`、`nodemon app.js`、`pm2 app.js`等命令启动后端项目
* 进入hopeDamp_froumn_web文件夹根目录，打开控制台执行`npm install`下包，然后使用`npm run start` 命令启动前端项目
* 打开浏览器，地址栏输入locaohost:3000进入项目首页