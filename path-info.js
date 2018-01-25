const fs = require('fs');
const conf = { encoding: 'utf8' };

module.exports = (path, callback) => {
  fs.stat(path, (err, stats) => {
    if (err) {
      // ошибка получения информации об объекте
      callback(err);
    } else {
      let result = { path };

      if (stats.isFile()) {
        result.type = "file";

        fs.readFile(path, conf, (err, content) => {
          if (err) {
            // ошибка чтения файла
            callback(err);
          } else {
            result.content = content;
            // успешное получение расширенной информации о файле
            callback(null, result);
          }
        });
      } else if (stats.isDirectory()) {
        result.type = "directory";

        fs.readdir(path, (err, files) => {
          if (err) {
            // ошибка чтения директории
            callback(err);
          } else {
            result.childs = files;
            // успешное получение расширенной информации о директории
            callback(null, result);
          }
        });
      } else {
        // успешное получение расширенной информации о неизвестном типе
        callback(null, result);
      }
    }
  });
};