import "dotenv/config.js"
const { DB_URI, DB_NAME } = process.env;

const databaseConfig = {
    uri: DB_URI,
    name: DB_NAME
}
export default databaseConfig