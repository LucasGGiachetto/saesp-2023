const db = require('../db');

// Listar turmas do professor logado
const read = (req, res) => {
  const query = `
    SELECT *
    FROM turmas t
    WHERE professor_id = ?
  `;

  const query2 = `SELECT * FROM turmas`;

  if (req.params.id) {
    db.query(query, [req.params.id], (err, turmas) => {
      if (err) throw err;
      res.json(turmas);
    });
  } else {
    db.query(query2, (err, turmas) => {
      if (err) throw err;
      res.json(turmas);
    });
  }
}

// Cadastrar turma
const create = (req, res) => {
  const { nome, professor_id } = req.body;
  const query = 'INSERT INTO turmas (nome, professor_id) VALUES (?, ?)';

  db.query(query, [nome, professor_id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
}

const del = (req, res) => {
  const turmaId = req.params.id;
  const professorId = req.params.professorId; // ou do body

  const checkQuery = 'SELECT COUNT(*) AS total FROM atividades WHERE turma_id = ?';
  db.query(checkQuery, [turmaId], (err, results) => {
    if (err) throw err;

    if (results[0].total > 0) {
      return res.status(400).json({ error: "Você não pode excluir uma turma com atividades cadastradas." });
    }

    const deleteQuery = 'DELETE FROM turmas WHERE id = ? AND professor_id = ?';
    db.query(deleteQuery, [turmaId, professorId], (err, result) => {
      if (err) throw err;
      res.json({ success: true });
    });
  });
}

module.exports = {
  create,
  read,
  del
};