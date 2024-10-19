const nomeCliente = document.getElementById("nome-cliente");
const cpfCliente = document.getElementById("cpf-cliente");
const dataNascimentoCliente = document.getElementById("data-nascimento-cliente");
const generoCliente = document.getElementById("genero-cliente");

const cepClienteFaturamento = document.getElementById("cep-cliente-faturamento");
const logradouroClienteFaturamento = document.getElementById("logradouro-cliente-faturamento");
const numeroClienteFaturamento = document.getElementById("numero-cliente-faturamento");
const complementoClienteFaturamento = document.getElementById("complemento-cliente-faturamento");
const bairroClienteFaturamento = document.getElementById("bairro-cliente-faturamento");
const cidadeClienteFaturamento = document.getElementById("cidade-cliente-faturamento");
const ufClienteFaturamento = document.getElementById("uf-cliente-faturamento");

const cepClienteEntrega = document.getElementById("cep-cliente-entrega");
const logradouroClienteEntrega = document.getElementById("logradouro-cliente-entrega");
const numeroClienteEntrega = document.getElementById("numero-cliente-entrega");
const complementoClienteEntrega = document.getElementById("complemento-cliente-entrega");
const bairroClienteEntrega = document.getElementById("bairro-cliente-entrega");
const cidadeClienteEntrega = document.getElementById("cidade-cliente-entrega");
const ufClienteEntrega = document.getElementById("uf-cliente-entrega");

const emailCliente = document.getElementById("email-cliente");
const senhaCliente = document.getElementById("senha-cliente");
const confirmarSenhaCliente = document.getElementById("confirmar-senha-cliente");
const btnInscreverSe = document.getElementById("btn-inscrever-se");
let responseAPI;



btnInscreverSe.addEventListener('click', (event) => {
  event.preventDefault()

  const data = {
    nome: nomeCliente.value,
    cpf: cpfCliente.value,
    email: emailCliente.value,
    senha: senhaCliente.value,
    grupoId: "CLIENTE",
    dataDeNascimento: dataNascimentoCliente.value,
    genere: generoCliente.options[generoCliente.selectedIndex].text.replace(/\s+/g, "_").toUpperCase(),
    enderecoDeFaturamento: {
      cep: cepClienteFaturamento.value,
      logradouro: logradouroClienteFaturamento.value,
      complemento: complementoClienteFaturamento.value,
      cidade: cidadeClienteFaturamento.value,
      numero: numeroClienteFaturamento.value,
      bairro: bairroClienteFaturamento.value,
      uf: ufClienteFaturamento.value,
      enderecoPadrao: false
    },
    enderecoDeEntrega: {
      cep: cepClienteEntrega.value,
      logradouro: logradouroClienteEntrega.value,
      complemento: complementoClienteEntrega.value,
      cidade: cidadeClienteEntrega.value,
      numero: numeroClienteEntrega.value,
      bairro: bairroClienteEntrega.value,
      uf: ufClienteEntrega.value,
      enderecoPadrao: true
    }
  };

  fetch("http://localhost:8080/cliente/cadastrar", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      responseAPI = response.status
      console.log(responseAPI)
      return response.json();
    })

    .then(result => {

      if (responseAPI === 400) {
        alert("Não foi possível cadastrar o usuário. \nCampo: " + result.campo + "\nMotivo: " + result.mensagem)
      } else {
        alert("Cliente '" + result.nome + "' criado com sucesso!")
        window.location.href = "./login-cliente.html";
      }
    })
    .catch(error => {
      console.error('Erro:', error);
    });

  console.log(data);
})






