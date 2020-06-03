module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true
  }
}