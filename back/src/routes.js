const express = require('express');

const routes = express.Router();

const Professor = require('./controllers/professores');
const Turma = require('./controllers/turmas');

routes.get('/', (req, res) => {
    res.send('API Escola Respondendo');
});

routes.post('/professor', Professor.create);
routes.get('/professor', Professor.read);
routes.delete('/professor/:id', Professor.delete);
routes.put('/professor/:id', Professor.update);


routes.post('/turma', Turma.create);
routes.get('/turmas', Turma.read);
routes.delete('/turma/:id', Turma.delete);
routes.put('/turma/:id', Turma.update);

module.exports = routes;