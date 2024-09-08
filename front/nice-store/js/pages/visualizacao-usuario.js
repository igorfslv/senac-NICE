import { listarUsuarios } from "../pages/listar-usuarios.js";
import { listarProdutos } from "../pages/listar-produtos.js";
import { listarPedidos } from "../pages/listar-pedidos.js";

export function exibirOpcoesUsuario() {

    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    usuarioLogado = JSON.stringify(usuarioLogado.grupoId);
    usuarioLogado = usuarioLogado.replace(/"/g, '');

    let grupoUsuarioLogado = document.querySelector(".grupo-usuario-logado");
    grupoUsuarioLogado.textContent = usuarioLogado;

    let btnLogOut = document.querySelector(".bx-log-out");

    let listagem1 = document.querySelector(".listagem-1");
    let listagem2 = document.querySelector(".listagem-2");

    if (grupoUsuarioLogado.textContent === "ADMINISTRADOR") {
        let btnListaProdutos = document.createElement("button");
        let btnListaUsuarios = document.createElement("button");

        btnListaProdutos.id = "lista-produtos";
        btnListaUsuarios.id = "lista-usuarios";

        btnListaProdutos.textContent = "Lista de Produtos";
        btnListaUsuarios.textContent = "Lista de Usuários";

        listagem1.appendChild(btnListaProdutos);
        listagem2.appendChild(btnListaUsuarios);

        btnListaUsuarios.addEventListener('click', listarUsuarios);
        btnListaProdutos.addEventListener('click', listarProdutos);
        btnLogOut.addEventListener('click', logout);
    }
    else if (grupoUsuarioLogado.textContent === "ESTOQUISTA") {

        let btnListaPedidos = document.createElement("button");
        let btnListaProdutos = document.createElement("button");

        btnListaProdutos.id = "lista-produtos";
        btnListaPedidos.id = "lista-pedidos";

        btnListaProdutos.textContent = "Lista de Produtos";
        btnListaPedidos.textContent = "Lista de Pedidos";

        listagem1.appendChild(btnListaProdutos);
        listagem2.appendChild(btnListaPedidos);

        btnListaProdutos.addEventListener('click', listarProdutos);
        btnListaPedidos.addEventListener('click', listarPedidos);
        btnLogOut.addEventListener('click', logout);
    }
}

function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = "./login.html";
}