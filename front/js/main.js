const usuario = obterUsuario();
if (!usuario) {
  window.location.href = './';
}

const professorNomeSpan = document.getElementById('professorNome');
if (professorNomeSpan) {
  professorNomeSpan.textContent = usuario.nome;
}

carregarTurmas();

async function carregarTurmas() {
  
  const tbody = document.getElementById('turmasBody');

  fetch('http://localhost:3000/turmas/' + usuario.id)
    .then(response => response.json())
    .then(response => {
      response.forEach(turma => {
        const tr = document.createElement('tr');  
        tr.innerHTML = `
          <td>${turma.id}</td>
          <td>${turma.nome}</td>
          <td>
            <button class="secondary" onclick="excluirTurma(${turma.id})">Excluir</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => console.error(err));
}

async function excluirTurma(id) {
  if (!confirm('Tem certeza que deseja excluir esta turma?')) return;

  const res = await fetch(`/turmas/${id}`, { method: 'DELETE' });
  const data = await res.json();

  if (data.success) {
    location.reload();
  } else {
    alert(data.error || "Erro ao excluir turma.");
  }
}