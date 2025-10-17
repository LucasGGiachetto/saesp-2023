const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
  const query = `
    SELECT t.id, t.nome
    FROM turmas t
    WHERE t.professor_id = ?
  `;

  db.query(query, [req.session.userId], (err, turmas) => {
    if (err) throw err;

    res.render('dashboard', { professorNome: req.session.professorNome, turmas });
  });
});

// Cadastrar turma
router.post('/nova', (req, res) => {
  const { nome } = req.body;
  const query = 'INSERT INTO turmas (nome, professor_id) VALUES (?, ?)';

  db.query(query, [nome, req.session.userId], (err, result) => {
    if (err) throw err;
    res.redirect('/turmas');
  });
});

router.delete('/:id', (req, res) => {
  const turmaId = req.params.id;

  const checkQuery = 'SELECT COUNT(*) AS total FROM atividades WHERE turma_id = ?';
  db.query(checkQuery, [turmaId], (err, results) => {
    if (err) throw err;

    if (results[0].total > 0) {
      return res.status(400).json({ error: "Você não pode excluir uma turma com atividades cadastradas." });
    }

    const deleteQuery = 'DELETE FROM turmas WHERE id = ? AND professor_id = ?';
    db.query(deleteQuery, [turmaId, req.session.userId], (err, result) => {
      if (err) throw err;
      res.json({ success: true });
    });
  });
});

module.exports = router;