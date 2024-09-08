//Escrever aqui os FETCHs de conexão com o back-end para o CADASTRO DE USUÁRIO

const nomeUsuario = document.getElementById('nome-usuario');
const cpfUsuario = document.getElementById('cpf-usuario');
const emailUsuario = document.getElementById('email-usuario');
const grupoUsuario = document.getElementById('grupo-usuario');
const senhaUsuario = document.getElementById('senha-usuario');
const confirmarSenhaUsuario = document.getElementById('confirmar-senha-usuario');
const botaoCadastro = document.getElementById('botao-cadastro');
const btnCancelar = document.querySelector('.btn-cancelar');
let responseAPI;

botaoCadastro.addEventListener('click', function (event) {

    event.preventDefault();
    const usuarioJSON = localStorage.getItem('usuarioLogado');

    if (!usuarioJSON) {
        alert("Você não esta logado.")
        return
    }
    if (!(nomeUsuario.value && cpfUsuario.value && emailUsuario.value && grupoUsuario.selectedIndex !== 0 &&
        senhaUsuario.value && confirmarSenhaUsuario.value)) {
        alert("Preencha todos os campos!")
        return
    }
    if (senhaUsuario.value != confirmarSenhaUsuario.value) {
        alert("As senhas devem ser iguais")
        return
    }

    const usuario = JSON.parse(usuarioJSON);
    const url = `http://localhost:8080/admin/cadastrar/${usuario.id}`;
    const data = {
        "nome": nomeUsuario.value,
        "cpf": cpfUsuario.value,
        "email": emailUsuario.value,
        "senha": senhaUsuario.value,
        "grupoId": grupoUsuario.options[grupoUsuario.selectedIndex].text.toUpperCase()
    };

    fetch(url, {
        method: 'POST',
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

            if(responseAPI === 400) {
                alert("Não foi possível cadastrar o usuário. \nCampo: " + result.campo + "\nMotivo: " + result.mensagem)
           } else {
                alert("Usuário '" + result.nome + "' criado com sucesso!")
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