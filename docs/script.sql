CREATE DATABASE IF NOT EXISTS turmas_db;
USE turmas_db;

CREATE TABLE professores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE turmas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    professor_id INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE CASCADE
);

CREATE TABLE atividades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao TEXT NOT NULL,
    turma_id INT NOT NULL,
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE
);

INSERT INTO professores (nome, email, senha) VALUES
('Ana Silva', 'ana@escola.com', '$2b$10$...'),
('Carlos Souza', 'carlos@escola.com', '$2b$10$...'),
('Mariana Costa', 'mariana@escola.com', '$2b$10$...');

INSERT INTO turmas (nome, professor_id) VALUES
('Turma A - 6º Ano', 1),
('Turma B - 7º Ano', 1),
('Turma C - 8º Ano', 2);

INSERT INTO atividades (descricao, turma_id) VALUES
('Leitura do capítulo 1', 1),
('Exercícios de matemática', 1),
('Pesquisa sobre ecossistemas', 2);