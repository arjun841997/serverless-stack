import { MongoClient } from "mongodb";
import caBundle from "raw-loader!./rds-combined-ca-bundle.pem";
let cachedDb = null;
function connectToDatabase() {

if (cachedDb) {

return Promise.resolve(cachedDb);

}

return MongoClient.connect(

"mongodb://root:12345678@docdb-2019-07-04-10-59-24.cluster-czgvzu9taqvg.us-east-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0",

{ ssl: true, sslCA: caBundle }
    )
.then(db => {

cachedDb = db;

return cachedDb;

});
}

export async function main(event, context) {

const db = await connectToDatabase();
    // Do something with it...

var dbo = db.db("mydb");
dbo.createCollection("customers", function(err, res) {
  if (err){
    console.log(err)
  }
  console.log("Collection created!");
  db.close();
});

};