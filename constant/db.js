const db = require("./../connection");

module.exports.conn = () => {
  return new Promise((resolve) => {
    db.getConnection((err, con) => {
      return resolve(con);
    });
  });
};