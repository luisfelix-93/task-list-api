const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

//Configurar o middleware para lidar com requisições JSON
app.use(express.json());
app.use(cors());

//Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/todo-list',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao banco de dados MongoDB');
});


// Definir o modelo de dados do ToDo
const todoSchema = new mongoose.Schema({
  text: String,
  date: String,
  startTime: String,
  endTime: String,
  notes: String,
});

const Todo = mongoose.model('Todo', todoSchema);

// Definir as rotas da API
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao buscar os todos' });
  }
});

app.post('/todos', async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao criar o todo' });
  }
});

// Atualizar uma tarefa
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = req.body;
    const result = await Todo.findByIdAndUpdate(id, updatedTodo, { new: true });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar o todo' });
  }
});

// Excluir uma tarefa
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Tarefa excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Ocorreu um erro ao excluir o todo' });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});

