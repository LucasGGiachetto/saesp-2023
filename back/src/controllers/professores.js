const con = require('../db');

function create(req, res) {
    const { nome, email, senha } = req.body;
    const sql = `INSERT INTO professores (nome, cpf, nascimento) VALUES ('${nome}', '${email}', '${senha}')`;
    con.query(sql, (error, result) => {
        if (error) {
            res.status(500).json('Erro ao cadastrar professor');
        } else {
            res.status(201).json('Professor cadastrado com sucesso');
        }
    });
};

function read(req, res) {
    const sql = 'SELECT * FROM professores';
    con.query(sql, (error, result) => {
        if (error) {
            res.status(500).json('Erro ao consultar professores');
        } else {
            res.status(200).json(result);
        }
    });
}

function login(req, res) {
    const sql = 'SELECT * FROM professores WHERE email = ? AND senha = ?';
    con.query(sql, [req.body.email, req.body.senha], (error, result) => {
        if (error) {
            res.status(500).json('Email ou senha incorretos');
        } else {
            res.status(200).json(result);
        }
    });
}

module.exports = {
    create,
    login,
    read
}