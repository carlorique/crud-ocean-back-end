const express = require("express");
const app = express();
const { MongoClient, ObjectId} = require("mongodb");

//const DB_URL = "mongodb://127.0.0.1:27017";
const DB_URL = "mongodb+srv://admin:wHFcU5JtWOUALGqg@cluster0.fdfbwnn.mongodb.net";
const DB_NAME = "banco-mongodb-carlos";

async function main(){

console.log("conectando o banco com sucesso");
const client = await MongoClient.connect(DB_URL);
const db = client.db(DB_NAME);
const collection = db.collection("itens");
console.log("banco de dados conctando com sucesso");

//o que vier no body da requisicao, está em json

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

// endpoint /oi -> Olá, mundo
app.get("/oi", function (req, res){
  res.send("Olá mundo!");
});

//lista de informacoes
const itens = ["Rick Sanchez", "Morty Smith", "Summer Smith"];

//crud -> lista de informacors

// endpoint read all -> [GET]
app.get("/item", async function (req, res){
  const documentos = await collection.find().toArray();
  res.send(documentos);
});

//endpint e=read single by id -> [get] /item/:id
app.get("/item/:id", async function(req, res){
  const id = req.params.id;
  const item = await collection.findOne({_id: new ObjectId(id)});
  res.send(item);
});

//endpoint create -> [post] /item
app.post("/item", async function(req, res){
  const item = req.body;
  await collection.insertOne(item);
  res.send(item); 
});

//Endpoint Update ->
app.put("/item/:id", async function(req, res){
  const id = req.params.id;
  const body = req.body;

  //console.log(id, body);

   await collection.updateOne(
    {_id: new ObjectId(id)},
    {$set: body} 
  );
  res.send(body);
});

app.listen(3000);
}

main();