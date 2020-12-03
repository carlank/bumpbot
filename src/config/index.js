import dotenv from 'dotenv';
dotenv.config();


export default {
  prefix: process.env.PREFIX,
  admins: process.env.ADMIN_ID.split(',')
}