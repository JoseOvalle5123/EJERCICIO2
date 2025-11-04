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
    res.status(201).json({ message: " Card created successfully!", card });
  } catch (error) {
    res.status(400).json({ error: " Error creating card", details: error.message });
  }
});

// 2Actualizar una carta por ID (PUT o PATCH)
app.put("/updateCard/:id", async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCard) return res.status(404).json({ error: "Card not found" });
    res.status(200).json({ message: " Card updated successfully!", updatedCard });
  } catch (error) {
    res.status(400).json({ error: " Error updating card", details: error.message });
  }
});

// Agregar una carta (similar a createCard)
app.post("/addCard", async (req, res) => {
  try {
    // Verifica si ya existe una carta con el mismo nombre
    const existing = await Card.findOne({ name: req.body.name });
    if (existing) {
      return res.status(409).json({ message: " Card with that name already exists" });
    }
    const newCard = await Card.create(req.body);
    res.status(201).json({ message: " Card added successfully!", newCard });
  } catch (error) {
    res.status(400).json({ error: " Error adding card", details: error.message });
  }
});

// Obtener una carta por ID
app.get("/getCard/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ error: "Card not found" });
    res.status(200).json(card);
  } catch (error) {
    res.status(400).json({ error: " Invalid card ID", details: error.message });
  }
});

// Obtener todas las cartas
app.get("/getCards", async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: " Error retrieving cards", details: error.message });
  }
});

// Eliminar una carta por ID
app.delete("/deleteCard/:id", async (req, res) => {
  try {
    const deleted = await Card.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Card not found" });
    res.status(200).json({ message: " Card deleted successfully!" });
  } catch (error) {
    res.status(400).json({ error: " Error al eliminar Carta", details: error.message });
  }
});

// muestra todos los endpoints
app.get("/review", (req, res) => {
  const endpoints = `
==== ENDPOINTS DISPONIBLES ====

POST   /createCard       → Crear una carta
PUT    /updateCard/:id   → Actualizar una carta
POST   /addCard          → Agregar una carta (con verificación)
GET    /getCard/:id      → Obtener carta por ID
GET    /getCards         → Obtener todas las cartas
DELETE /deleteCard/:id   → Eliminar carta
GET    /review           → Muestra esta lista
`;
  res.status(200).send(endpoints);
});

// Inicialización del servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(` Servidor ejecutándose en http://localhost:${PORT}`);
});
