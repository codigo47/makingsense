const MongoClient = require('mongodb').MongoClient;

class BaseService {
  constructor(collection) {
    this._collection = collection;
  }

  async connect() {
    var cnnString = 'mongodb://mongo:27017/blog';
    var dbName = 'blog';

    const cnn = await MongoClient.connect(cnnString, { useNewUrlParser: true });

    return await cnn.db(dbName);
  }

  async insert(obj) {
    var db = await this.connect();

    return await db
      .collection(this._collection)
      .insertOne(obj);
  }

  async update(filter, obj) {
    var db = await this.connect();

    return await db
      .collection(this._collection)
      .updateOne(filter, {$set: obj});
  }
  
  async remove(filter) {
    var db = await this.connect();

    return await db
      .collection(this._collection)
      .deleteOne(filter);
  }  

  async add(filter, obj) {
    var db = await this.connect();

    return await db
      .collection(this._collection)
      .update(filter, {$push: obj});
  }

  async findAll(query) {
    var db = await this.connect();

    return await db
      .collection(this._collection)
      .find(query)
      .toArray();
  }

  async findOne(query) {
    const docs = await this.findAll(query);

    if (docs == undefined)
      return undefined;

    if (docs.lenght != 0)
      return docs[0];
    else
      return undefined;
  }

}

module.exports = BaseService;