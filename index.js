const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let todos = [];

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post("/todos", (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Delete a todo by id
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  todos = todos.filter((todo) => todo.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Todo app listening at http://localhost:${port}`);
});
