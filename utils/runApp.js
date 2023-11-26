import Database from "../utils/mongodb.utils.js";
import Server from "../utils/server.utils.js";

class App {
  static async run(app) {
    try {
      await Database.connect().then(async () => {
        Server.start(app);
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default App