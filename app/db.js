const { app } = require("electron");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const APP_DATA_PATH = `${app.getPath("appData")}/Simple-RSS-Reader`;
const adapter = new FileSync(`${APP_DATA_PATH}/db.json`);
const db = low(adapter);

db.defaults({ feeders: [] }).write();

module.exports = {
  insertFeeder: data => {
    const result = db
      .get("feeders")
      .find({ url: data.url })
      .value();

    if (result) {
      return;
    }

    db
      .get("feeders")
      .push(data)
      .write();
  },
  getFeeders: () => (
    db.get("feeders")
      .value()
  )
};
