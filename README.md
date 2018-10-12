# egg_RESTfulAPI_mysql

## Development

```bash
# install dependencies
npm install
# start
npm run dev

# 创建数据库
mysql -u root -e 'CREATE DATABASE IF NOT EXISTS `test_development`;'
mysql -u root -e 'CREATE DATABASE IF NOT EXISTS `test_test`;'

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
