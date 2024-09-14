const idUsuario = document.getElementById('id-conta-usuario');
const nomeUsuario = document.getElementById('nome-usuario');
const cpfUsuario = document.getElementById('cpf-usuario');
const emailUsuario = document.getElementById('email-usuario');
const grupoUsuario = document.getElementById('grupo-usuario');
const senhaUsuario = document.getElementById('senha-usuario');
const confirmarSenhaUsuario = document.getElementById('confirmar-senha-usuario');
const btnCancelar = document.querySelector('.btn-cancelar');
const btnEnviar = document.querySelector('.btn-enviar');
const statusUsuario = document.getElementById('status-usuario');

const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

const urlId = new URL(window.location.href);
const id = urlId.searchParams.get("id");

console.log(usuarioLogado)

console.log(usuarioLogado.id)
console.log(id)

const url = `http://localhost:8080/admin/getUsuario/${usuarioLogado.id}/${id}`;

fetch(url)
    .then(response => response.json())
    .then(result => {

        const usuarioJson = result;
        console.log(usuarioJson)
        idUsuario.value = usuarioJson.id
        nomeUsuario.value = usuarioJson.nome
        cpfUsuario.value = usuarioJson.cpf
        emailUsuario.value = usuarioJson.email
        statusUsuario.value = usuarioJson.ativo ? statusUsuario.options[0].value : statusUsuario.options[1].value;

        console.log(usuarioLogado.id != id)

        console.log(usuarioLogado.id)
        console.log(id)

        if (usuarioLogado.id !== id) {
            for (let i = 0; i < grupoUsuario.options.length; i++) {
                if (grupoUsuario.options[i].text.toUpperCase() === usuarioJson.grupoId) {
                    grupoUsuario.value = grupoUsuario.options[i].value;
                    break;
                }
            }
        } else {
            grupoUsuario.disabled = true
        }
    });

btnEnviar.addEventListener('click', function (event) {

    event.preventDefault();

    if (!usuarioLogado) {
        alert("Você não esta logado.")
        return
    }
    if (!(nomeUsuario.value && cpfUsuario.value && emailUsuario.value && (grupoUsuario.selectedIndex !== 0 || usuarioLogado.id === id))) {
        alert("Preencha todos os campos!")
        return
    }
    if (senhaUsuario.value != confirmarSenhaUsuario.value) {
        alert("As senhas devem ser iguais")
        return
    }

    const url = `http://localhost:8080/admin/alterarUsuario/${usuarioLogado.id}`;
    const data = {
        "id": idUsuario.value,
        "nome": nomeUsuario.value,
        "cpf": cpfUsuario.value,
        "senha": senhaUsuario.value,
        "grupoId": usuarioLogado.id !== id ? grupoUsuario.options[grupoUsuario.selectedIndex].text.toUpperCase() : usuarioLogado.grupoId,
        "ativo": statusUsuario.selectedIndex === 0 ? true : false
    };

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            responseAPI = response.status
            return response.json();
        })

        .then(result => {

            if (responseAPI === 400) {
                alert("Não foi possível alterar o usuário " + result.nome + ". \nCampo: " + result.campo + "\nMotivo: " + result.mensagem)
            } else {
                alert("Usuário '" + result.nome + "' alterado com sucesso!")
                window.location.href = "./visualizacao-usuario.html";
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            const erro = JSON.stringify(error)

        });
});

btnCancelar.addEventListener('click', () => {
    window.location.href = "./visualizacao-usuario.html";
});