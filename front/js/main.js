document.addEventListener('DOMContentLoaded', () => {
  fetch('/turmas')
    .then(res => res.json())
    .then(data => {
      document.getElementById('professorNome').textContent = data.professorNome;

      const tbody = document.getElementById('turmasBody');
      tbody.innerHTML = '';

      data.turmas.forEach(t => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${t.id}</td>
          <td>${t.nome}</td>
          <td class="actions">
            <a href="/atividades/turma/${t.id}"><button class="primary">Visualizar</button></a>
            <button class="danger" onclick="excluirTurma(${t.id})">Excluir</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    });

  document.getElementById('formTurma').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('turmaNome').value;

    await fetch('/turmas/nova', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `nome=${encodeURIComponent(nome)}`
    });
    location.reload();
  });
});

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