const express = require('express');

const routes = express.Router();

const Professor = require('./controllers/professores');

routes.get('/', (req, res) => {
    res.send('API Escola Respondendo');
});

routes.post('/professor', Professor.create);
routes.get('/professor', Professor.read);



module.exports = routes;