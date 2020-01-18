const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');
const { setupWebSocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://todesco:todesco@cluster0-ngrj0.mongodb.net/devradar?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:
// Query Params: request.query (filtros, ordenação, paginação) -> GET - http://localhost:3333/users?search=Diego
// Route Params: request.params (identificar um recurso na alteração ou remoção) -> PUT, DELETE - http://localhost:3333/users/1
// Body: request.body (dados para criação ou alteração de um registro) -> POST, PUT - http://localhost:3333/users com JSON {'name': gabriel, 'email': todesco@gmail.com}
//console.log(request.body);

// MongoDB (Não-relacional)

// app.get('/users');
// app.post('/users', (request, response) => {
//     console.log(request.body);
//     return response.json({message: 'Hello Todesco'});
// });

server.listen(3333);