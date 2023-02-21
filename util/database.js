const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
   MongoClient.connect(process.env.CONNECTION_URL)
   .then((client) => {
      console.log("connected");
      _db = client.db("shop");
      //console.log(process.env.CONNECTION_URL)
      callback();
    })
    .catch((err) => {
      console.log(err)
      throw err;
    });
};

const getDb = () => {
  if(_db){
    return _db;
  }
  throw 'no database found';
}

//module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
