const { app, ipcMain } = require("electron");
const { parseXml } = require("./xml-parser");
const htmlToText = require("html-to-text");
const { insertFeeder, getFeeders, updateFeeder } = require("./db");

function getUrl(url) {
  let _url = url.split("://");
  let protocol = "http";
  if (_url[0].includes("https:")) {
    protocol = "https";
  }
  return `${protocol}://${_url[1]}`;
}

module.exports = {
  register: (callback = undefined) => {
    ipcMain.on("on-ready", (event, args) => {
      // register ipc event
      ipcMain.on("register-protocol", (event, args) => {
        app.setAsDefaultProtocolClient("feed");
      });
      ipcMain.on("add-new-feeder", (event, args) => {
        parseXml(getUrl(args.url), result => {
          const channel = result.rss.channel[0];
          const meta = {
            url: args.url,
            title: channel.title[0],
            link: channel.link[0],
            description: channel.description[0],
            language: channel.language && channel.language[0],
            image: channel.image
              ? {
                  url: channel.image[0].url[0],
                  title: channel.image[0].title[0],
                  link: channel.image[0].link[0]
                }
              : {}
          };

          let items = channel.item.map(value => {
            let description = htmlToText.fromString(value.description[0], {
              ignoreImage: true
            });
            if (description.length > 200) {
              description = `${description.substring(0, 200)}...`;
            }
            return {
              title: value.title[0],
              link: value.link[0],
              description,
              author: value.author ? value.author[0] : "",
              pubDate: value.pubDate ? value.pubDate[0] : ""
            };
          });

          meta.items = items;

          insertFeeder(meta);

          let feeders = getFeeders();
          event.sender.send("read-feeders", { feeders });
        });
      });

      // send first
      if (!app.isDefaultProtocolClient("feed")) {
        event.sender.send("ask-register-protocol");
      }

      let feeders = getFeeders();
      event.sender.send("read-feeders", { feeders });

      for (let feeder of feeders) {
        (url => {
          parseXml(getUrl(url), result => {
            const channel = result.rss.channel[0];
            const meta = {
              url,
              title: channel.title[0],
              link: channel.link[0],
              description: channel.description[0],
              language: channel.language && channel.language[0],
              image: channel.image
                ? {
                    url: channel.image[0].url[0],
                    title: channel.image[0].title[0],
                    link: channel.image[0].link[0]
                  }
                : {}
            };

            let items = channel.item.map(value => {
              let description = htmlToText.fromString(value.description[0], {
                ignoreImage: true
              });
              if (description.length > 200) {
                description = `${description.substring(0, 200)}...`;
              }
              return {
                title: value.title[0],
                link: value.link[0],
                description,
                author: value.author ? value.author[0] : "",
                pubDate: value.pubDate ? value.pubDate[0] : ""
              };
            });

            meta.items = items;

            updateFeeder(meta);

            let feeders = getFeeders();
            event.sender.send("read-feeders", { feeders });
          });
        })(feeder.url);
      }

      if (callback) {
        callback();
      }
    });
  },
  addFeed: (url, mainWindow) => {
    let win = mainWindow;
    win.webContents.send("ask-add-new-feed", {
      url
    });
  }
};
