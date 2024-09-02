//export function logout() {
   // window.location.href = "./login.html";
//}

//Escrever aqui os FETCHs de conexão com o back-end para o LOGIN

console.log("asd")

const botaoLogin = document.getElementById('botao-login');
const emailUsuario = document.getElementById('email-usuario');
const senhaUsuario = document.getElementById('senha-usuario');

botaoLogin.addEventListener('click', function(event) {
  
    event.preventDefault();
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
    .then(response => response.json())
    .then(result => {
      console.log('Sucesso:', result);
      localStorage.setItem('usuarioLogado', JSON.stringify(result));
      window.location.replace('/nice-store/pages/visualizacao-usuario.html');

    })
    .catch(error => {
      console.error('Erro:', error);
    });
    
});