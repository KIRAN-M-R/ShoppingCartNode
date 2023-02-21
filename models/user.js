const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email){
    this.name = username;
    this.email = email;
  }
  save(){
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  static findById(userId){
    const db = getDb();
    return db.collection("users").findOne({_id: new ObjectId(userId)}).then(user=>{
      console.log(user);
      return user
    }).catch((err)=>{
      console.log(err);
    });
    //return db.collection("users").find({_id: new ObjectId(userId)}).next(); You can also use this instead
  }
}

module.exports = User;