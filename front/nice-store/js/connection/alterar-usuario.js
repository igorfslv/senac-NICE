//Escrever aqui os FETCHs de conexão com o back-end para o ALTERAÇÃO CADASTRO USUÁRIO

//Escrever aqui os FETCHs de conexão com o back-end para o CADASTRO DE USUÁRIO

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
let responseAPI;

//futuramente puxar a string do usuario a ser alterado do localstorage e botar nessa variavel ai que ja vai funcionar eu acho

const usuarioQueVaiSerAlterado = `{
    "id": "c3f2f85b-0a1e-4550-be14-ae29099d199b",
    "nome": "testeAlteracao!",
    "cpf": "977.169.980-64",
    "email": "cartro1@outlook.com",
    "senha": "$2a$10$BfB33d8MJ236jhSefoR9eez2KV/yYETtHlvEX0W8L/Db1t0aoIs6q",
    "grupoId": "ADMINISTRADOR",
    "ativo": true
}`;

const usuarioJson = JSON.parse(usuarioQueVaiSerAlterado);


idUsuario.value = usuarioJson.id
nomeUsuario.value = usuarioJson.nome
cpfUsuario.value = usuarioJson.cpf
emailUsuario.value = usuarioJson.email
statusUsuario.value = usuarioJson.ativo ? statusUsuario.options[0].value : statusUsuario.options[1].value;




for (let i = 0; i < grupoUsuario.options.length; i++) {
    if (grupoUsuario.options[i].text.toUpperCase() === usuarioJson.grupoId) {
        grupoUsuario.value = grupoUsuario.options[i].value;
        break;
    }
}



btnEnviar.addEventListener('click', function (event) {

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
    const url = `http://localhost:8080/admin/alterarUsuario/${usuario.id}`;
    const data = {
        "id": idUsuario.value,
        "nome": nomeUsuario.value,
        "cpf": cpfUsuario.value,
        "senha": senhaUsuario.value,
        "grupoId": grupoUsuario.options[grupoUsuario.selectedIndex].text.toUpperCase(),
        "ativo": usuarioJson.selectedIndex === 0 ? true : false
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
                alert("Usuário " + result.nome + " criado com sucesso!")
                location.reload()
            }


            // window.location.href = "./visualizacao-usuario.html";
        })
        .catch(error => {
            console.error('Erro:', error);
            const erro = JSON.stringify(error)

        });

});

btnCancelar.addEventListener('click', () => {
    window.location.href = "./visualizacao-usuario.html";
});