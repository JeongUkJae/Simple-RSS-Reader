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
  getFeeders: () => db.get("feeders").value(),
  updateFeeder: data => {
    const el = db.get("feeders").find({ url: data.url });
    const result = el.value();

    let newItems = result.items;
    let links = newItems.map(value => value.link);

    for (let item of data.items) {
      if (links.includes(item.link)) {
        newItems = newItems.map(
          value => (value.link === item.link ? item : value)
        );
      } else {
        newItems.push(item);
      }
    }

    newItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    el.assign(Object.assign({}, data, { items: newItems })).write();
  }
};
