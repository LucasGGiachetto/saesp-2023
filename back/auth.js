const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const query = 'SELECT * FROM professores WHERE email = ?';
  
  db.query(query, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.redirect('/?erro=1');
    }

    const user = results[0];
    // Se usar senhas em texto claro (só para teste!):
    if (senha === user.senha) {
      req.session.userId = user.id;
      req.session.professorNome = user.nome;
      return res.redirect('/turmas');
    } else {
      return res.redirect('/?erro=1');
    }
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;