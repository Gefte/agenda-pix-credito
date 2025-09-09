document.getElementById('leadForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = {
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        tipo: document.querySelector('input[name="tipo"]:checked').value,
        aceitou_lgpd: document.getElementById('aceitou_lgpd').checked
    };

    try {
        const response = await fetch('/lead', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Cadastro realizado com sucesso! Obrigado pelo interesse.');
            document.getElementById('leadForm').reset();
        } else {
            const error = await response.json();
            alert('Erro: ' + error.detail);
        }
    } catch (error) {
        alert('Erro de conexão. Tente novamente.');
    }
});