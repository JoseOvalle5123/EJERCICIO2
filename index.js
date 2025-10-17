import express from "express";
import { connectDB } from "./bd.js";
import { Card } from "./models/Card.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.post("/createCard", async (req, res) => {
  try {
    const card = await Card.create(req.body);
    //vamos a regresar la carta creada por mongo db
    console.log(Card);
    res.status(201).json(card).send("Card create succesfully!!");
  } catch (error) {
    res.status(400).send(error);
    console.error(error);
  }
});

//put y pathc actualizan uno es actualización completa y otro es actualización parcial
app.get("/getAllCards", async(req, res) => {
    try {
    const cards = await Card.find();
    res.status(200).json(cards);

  } catch (error){
    console.error(error)
  }
  
})

app.get("/getCard/:id", async(req, res) => {
    try {
      const id = parseInt(req.params.id);
    const cards = await Card.findById(req.params.id);
    res.status(200).json(cards);

  } catch (error){
    res.status(400).send(error);
    console.error(error);
  }
  
})

app.delete("/deleteCard/:id", async(req, res) => {
    try {
      const id = parseInt(req.params.id);
    await Card.findByIdAndDelete(req.params.id);
    res.status(200).send("Card delete successfully")

    /*if (id = null){
      res.status(400).send(error);

    }*/
  } catch (error){
    res.status(400).send(error);
    console.error(error);
  }
  
})

//Endpoint. node index.js
app.get("/hola", (req, res) => {
  res.status(200).send("Hello world from a server!!!! :0");
});

app.get("/adios", (req, res) => {
  res.status(200).send("Goodbye world from a server!!!! :0");
});

app.post("/send", (req, res) => {
  const { user, email } = req.body; //Lo estamos mandando en formato Json
  //imaginemos que agregamos unos daros a una data base
  console.log("Datos recibidos" + user + "" + email);

  res.status(200).send("Date received succesfuly :D");
});

const PORT = process.env.PORT;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});

