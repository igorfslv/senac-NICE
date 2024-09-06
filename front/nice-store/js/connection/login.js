console.log("asd")

const botaoLogin = document.getElementById('botao-login');
const emailUsuario = document.getElementById('email-usuario');
const senhaUsuario = document.getElementById('senha-usuario');
let responseAPI;

botaoLogin.addEventListener('click', function (event) {

  event.preventDefault();

  if (emailUsuario.value && senhaUsuario.value) {
    const url = 'http://localhost:8080/usuario/login';

    const data = {
      "email": emailUsuario.value,
      "senha": senhaUsuario.value
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
        if (responseAPI === 404) {
          alert("Credenciais incorretas")
          return
        } else {
          return response.json();
        }
  
      })
  
      .then(result => {
  
        alert("Logado como " + result.nome + " - " + result.grupoId)
        localStorage.setItem('usuarioLogado', JSON.stringify(result));
        window.location.href = "./visualizacao-usuario.html";
      })
  
      .catch(error => {
        console.error('Erro:', error);
      });
  } else {
    alert("Preencha todos os campos!")
  }



});