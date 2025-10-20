// routes.js
const express = require('express');
const routes = express.Router();

const Professor = require('./controllers/professores');
const Turma = require('./controllers/turmas');
// Importa as funções específicas do controller de atividades
const AtividadeController = require('./controllers/atividades');

routes.get('/', (req, res) => {
    res.json({titulo:'API Escola Respondendo'});
});

routes.post('/professor', Professor.create);
routes.get('/professor', Professor.read);
routes.post('/login', Professor.login);

routes.get('/turmas', Turma.read);
routes.get('/turmas/:id', Turma.read);
routes.post('/turmas', Turma.create);
routes.delete('/turmas/:id', Turma.del);

// Registra as funções específicas para cada rota
routes.get('/atividades/turma/:id', AtividadeController.getAtividadesPorTurma); // <-- Função específica para GET
routes.get('/atividades/turma', AtividadeController.getAtividadesPorTurma);    // <-- Mesma função para GET sem id
routes.post('/atividades/nova', AtividadeController.createAtividade);       // <-- Função específica para POST

module.exports = routes;