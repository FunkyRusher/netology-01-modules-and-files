const fs = require('fs');
const conf = { encoding: 'utf8' };

function readFile(name) {
  return new Promise((done, fail) => {
    fs.readFile(name, conf, (err, content) => {
      if (err) {
        fail(err);
      } else {
        done({name, content});
      }
    })
  });
}

module.exports = path => {
  return new Promise((done, fail) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        fail(err);
      } else {
        let promises = files.map(file => {
          return readFile(path + file);
        });

        Promise.all(promises).then(result => done(result)).catch(error => fail(error));
      }
    });
  });
};