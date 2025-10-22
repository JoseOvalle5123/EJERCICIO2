import express from "express";
import { connectDB } from "./bd.js";
import { Card } from "./models/Card.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Conexión a la base de datos
connectDB();

//  Crear una nueva carta
app.post("/createCard", async (req, res) => {
  try {
    const card = await Card.create(req.body);
    res.status(201).json({ message: "Card created successfully!", card });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error creating card", details: error.message });
  }
});

//Obtener todas las cartas
app.get("/getAllCards", async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving cards", details: error.message });
  }
});

// Obtener una carta por ID
app.get("/getCard/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.status(200).json(card);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid card ID", details: error.message });
  }
});

//Actualizar una carta por ID
app.put("/updateCard/:id", async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCard) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.status(200).json({ message: "Card updated successfully!", updatedCard });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error updating card", details: error.message });
  }
});

//Eliminar una carta por ID
app.delete("/deleteCard/:id", async (req, res) => {
  try {
    const deleted = await Card.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.status(200).json({ message: "Card deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error deleting card", details: error.message });
  }
});

// Endpoints de prueba
app.get("/hola", (req, res) => {
  res.status(200).send("Hello world from a server!!!! :0");
});

app.get("/adios", (req, res) => {
  res.status(200).send("Goodbye world from a server!!!! :0");
});

app.post("/send", (req, res) => {
  const { user, email } = req.body;
  console.log("Datos recibidos:", user, email);
  res.status(200).send("Data received successfully :D");
});

// Inicialización del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`);
});
