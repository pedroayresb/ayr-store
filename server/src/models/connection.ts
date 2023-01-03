import mysql from 'mysql2/promise'; 
import dotenv from 'dotenv';

const pathToEnv = __dirname.split('/server')[0];

dotenv.config({ path: `${pathToEnv}/.env`});

console.log(`Connecting to database on host: ${process.env.MYSQL_HOST}`)
console.log(`Connecting to database on user: ${process.env.MYSQL_USER}`)
console.log(`Connecting to database on password: ${process.env.MYSQL_PASSWORD}`)

export default mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});