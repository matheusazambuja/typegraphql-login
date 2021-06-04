require('dotenv').config();

module.exports = {
    type: "mysql",
    host: process.env.APP_DB_HOST,
    port: Number(process.env.APP_DB_PORT),
    username: process.env.APP_DB_USER,
    password: process.env.APP_DB_PASSWORD,
    database: process.env.APP_DB_NAME,
    migrations: [__dirname + '/dist/database/migrations/**.{ts,js}'],
    entities: [__dirname + '/dist/entities/**.{ts,js}'],
    cli: {
      entitiesDir: __dirname + "/dist/entities",
      migrationsDir: __dirname + "/dist/database/migrations"
    }
}