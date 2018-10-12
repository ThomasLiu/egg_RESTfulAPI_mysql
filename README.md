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

## Documents

[eggjs sequelize document](https://eggjs.org/zh-cn/tutorials/mysql.html)  
[egg-sequelize](https://github.com/eggjs/egg-sequelize)   
[sequelize](http://docs.sequelizejs.com)   
[sequelize-cli and migrations](http://docs.sequelizejs.com/manual/tutorial/migrations.html)   
[factory-girl](https://github.com/aexmachina/factory-girl)   
 