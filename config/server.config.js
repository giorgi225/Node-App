import "dotenv/config.js"
const { APP_PORT, APP_HOST } = process.env;

const serverConfig = {
  port: APP_PORT || 8000,
  host: APP_HOST || "localhost",
};

export default serverConfig;
