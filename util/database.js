const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = () => {
    MongoClient.connect(
            "mongodb+srv://itskumaravinder:ravinder@cluster0-cibl6.mongodb.net/cardetails?retryWrites=true&w=majority"
        )
        .then(client => {
            console.log("connected");
            _db = client.db();
        })
        .catch(err => {
            console.log(err);
        })
}


const getDb = () => {
    if (_db) {
        return _db;
    } else {
        console.log("no database found");
    }


}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;