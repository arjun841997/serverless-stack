
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://root:12345678@docdb-2019-07-04-10-59-24.cluster-czgvzu9taqvg.us-east-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0";

export async function main(event, context) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.createCollection("customers", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
};