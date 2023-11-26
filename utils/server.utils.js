import serverConfig from "../config/server.config.js";

class Server {
  static start(app) {
    app.listen(serverConfig.port, serverConfig.host, () => {
      console.log(`Server is running on http://${serverConfig.host}:${serverConfig.port}`);
    });
  }
}

export default Server