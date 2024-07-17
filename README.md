# NodeJs Backend Template

### Requirements:
* NodeJs >=12.16.0

* Mysql

update `DATABASE_URI` in .env file (eg. `mysql://root@localhost/test-db`)

### Build
To install dependencies :
\$ npm install

### Run Migrations

`npx sequelize-cli db:migrate`

More info visit https://sequelize.org/master/manual/migrations.html

### Run Dev
To start the project run :
\$ npm run dev

Inpect/Debug using chrome tools at address `0.0.0.0:9001`

### Run eslint

\$ npm run eslint:lint

### Package
To Build the project run :
\$ npm run build

To run the built project :
\$ npm run start
