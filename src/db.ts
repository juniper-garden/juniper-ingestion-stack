require('dotenv').config()
import { Sequelize } from 'sequelize'

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const databaseUrl:any = process.env.POSTGRES_URI
const sslConfig:any = process.env.NODE_ENV === 'production' && {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}
const sequelize = new Sequelize(databaseUrl, {
  ...sslConfig,
  dialect: 'postgres',
  protocol: 'postgres'
})

export default sequelize
