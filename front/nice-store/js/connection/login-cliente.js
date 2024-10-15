const emailCliente = document.getElementById("login-email-cliente");
const senhaCliente = document.getElementById("login-senha-cliente");
const btnEntrar = document.getElementById("btn-entrar");
let responseAPI;

btnEntrar.addEventListener('click', (event) => {
    event.preventDefault()

    const data = {
        "email": emailCliente.value,
        "senha": senhaCliente.value
    }

    fetch("http://localhost:8080/cliente/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
       
            if (response.status === 404) {
                return response.text().then(text => {
                    alert(text); 
                    return; 
                });
            }
            return response.json();
            
        })
    
        .then(result => {
    
                localStorage.clear();
                localStorage.setItem('usuarioLogado', JSON.stringify(result));
                alert("Logado como '" + result.nome)
                window.location.href = "../index.html";
        })
        .catch(error => {
            console.error('Erro:', error);    
        });
})


