const express = require("express");
const uuid = require("uuid");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

let todos = [];

// Get all todos
app.get("/api/todos", (req, res) => {
  try {
    return res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Add a new todo
app.post("/api/todos", (req, res) => {
  try {
    const newTodo = req.body;
    todos.push({ ...newTodo, id: uuid.v4() });
    return res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete a todo by id
app.delete("/api/todos/:id", (req, res) => {
  try {
    const id = req.params.id;
    todos = todos.filter((todo) => todo.id !== id);
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});
