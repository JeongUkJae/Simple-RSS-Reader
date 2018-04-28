const { parseString } = require("xml2js");
const axios = require("axios").default;

function parseXml(url, callback) {
  axios.get(url).then(resp => {
    parseString(resp.data, function(err, result) {
      if (err) {
        console.log(`An error occured in Xml-Parser: ${err}`);
        return;
      }
      callback(result);
    });
  }).catch(reason => {
    console.log(`An error occured in Xml-Parser: ${reason}`);
  });
}

module.exports = {
  parseXml
}
