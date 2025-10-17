const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/turma/:id', (req, res) => {
  const turmaId = req.params.id;

  const queryTurma = 'SELECT nome FROM turmas WHERE id = ?';
  const queryAtividades = `
    SELECT a.id, a.descricao
    FROM atividades a
    WHERE a.turma_id = ?
  `;

  db.query(queryTurma, [turmaId], (err, turmas) => {
    if (err) throw err;
    if (turmas.length === 0) return res.status(404).send("Turma não encontrada.");

    db.query(queryAtividades, [turmaId], (err, atividades) => {
      if (err) throw err;

      res.render('atividade', { turma: turmas[0], atividades });
    });
  });
});

router.post('/nova', (req, res) => {
  const { descricao, turma_id } = req.body;
  const query = 'INSERT INTO atividades (descricao, turma_id) VALUES (?, ?)';

  db.query(query, [descricao, turma_id], (err, result) => {
    if (err) throw err;
    res.redirect(`/atividades/turma/${turma_id}`);
  });
});

module.exports = router;