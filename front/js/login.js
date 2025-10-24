const api = "http://localhost:3000/login";

const login = document.getElementById('login-form');
login.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = {
        email: login.email.value,
        senha: login.senha.value
    }
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    };

    fetch('http://localhost:3000/login', options)
        .then(response => response.json())
        .then(response => {
            if (response[0].id !== undefined) {
                window.localStorage.setItem('usuario', JSON.stringify(response[0]));
                window.location.href = '/front/dashboard.html';
            } else {
                alert('E-mail ou senha inválidos.');
            }
        })
        .catch(err => console.error(err));
});
