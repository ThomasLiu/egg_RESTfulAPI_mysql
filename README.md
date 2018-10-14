# egg_RESTfulAPI_mysql

## Development

```bash
# install dependencies
npm install

# 创建数据库
mysql -u root -e 'CREATE DATABASE IF NOT EXISTS `egg_RESTfulAPI_mysql_development`;'
mysql -u root -e 'CREATE DATABASE IF NOT EXISTS `egg_RESTfulAPI_mysql_test`;'
```
#### 修改数据库配置
```
  + config/
    - config.local.js
    - config.prod.js
  + database/
    - config.json
```
或者项目搜索    
dbUserName，修改数据库用户名   
123456789, 修改数据库密码   
123123123141231.mysql.rds.aliyuncs.com，修改服务器数据库链接   
egg_RESTfulAPI_mysql，修改数据库名   

```bash
# start
npm run dev

# migrate up
npx sequelize db:migrate
# migrate up for test database
NODE_ENV=test npx sequelize db:migrate
# migrate seed
npx sequelize db:seed:all

# run migration and test, for CI environment
npm run ci
```

## Production
1、开一个新的文件夹，用Git 把项目下载，把/config/config.default.js 的 config.alinode 参数按照你在阿里云上的填上。   
2、把package.json 内 scripts 的 tt命令的IP地址改成你要上传的服务器地址。   
3、ssh上你的服务器，安装tt命令构建你的项目在服务器上的存放地址，或者修改tt的上传地址。   
4、然后运行
```
npm run tt
```
5、cd 到刚刚上传的目录进行解压
```
tar zxvf egg_RESTfulAPI_mysql.tgz
```
6、再运行
```
npm start
```
7、暂停项目
```
npm run stop
```

## Documents

[eggjs sequelize document](https://eggjs.org/zh-cn/tutorials/mysql.html)  
[egg-sequelize](https://github.com/eggjs/egg-sequelize)   
[sequelize](http://docs.sequelizejs.com)   
[sequelize-cli and migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html)   
[factory-girl](https://github.com/aexmachina/factory-girl)   
 