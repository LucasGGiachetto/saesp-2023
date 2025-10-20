const express = require('express');
const db = require('../db');
const router = express.Router(); 

function getAtividadesPorTurma(req, res) {
  const turmaId = req.params.id;

  const queryTurma = 'SELECT nome FROM turmas WHERE id = ?';
  const queryAtividades = `
    SELECT a.id, a.descricao
    FROM atividades a
    WHERE a.turma_id = ?
  `;

  db.query(queryTurma, [turmaId], (err, turmas) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar turma' });
    }
    if (turmas.length === 0) return res.status(404).json({ error: "Turma não encontrada." });

    db.query(queryAtividades, [turmaId], (err, atividades) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao buscar atividades' });
      }

      res.json({ turma: turmas[0], atividades });
    });
  });
}

function createAtividade(req, res) {
  const { descricao, turma_id } = req.body;
  const query = 'INSERT INTO atividades (descricao, turma_id) VALUES (?, ?)';

  db.query(query, [descricao, turma_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao cadastrar atividade' });
    }

    res.status(201).json({ message: 'Atividade cadastrada com sucesso!', id: result.insertId });
  });
}

module.exports = {
  getAtividadesPorTurma,
  createAtividade       
};

