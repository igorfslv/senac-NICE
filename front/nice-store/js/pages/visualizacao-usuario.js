import { listarUsuarios } from "../pages/listar-usuarios.js";
import { listarProdutos } from "../pages/listar-produtos.js";
import { logout } from "../connection/login.js";


export function exibirOpcoesUsuario() {
    let grupoUsuarioLogado = document.querySelector(".grupo-usuario-logado");
    let btnLogOut = document.querySelector(".bx-log-out");

    let listagem1 = document.querySelector(".listagem-1");
    let listagem2 = document.querySelector(".listagem-2");

    if (grupoUsuarioLogado.textContent === "Administrador") {
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
    else if (grupoUsuarioLogado.textContent === "Estoquista") {

        let btnListaPedidos = document.createElement("button");
        let btnListaProdutos = document.createElement("button");

        btnListaProdutos.id = "lista-produtos";
        btnListaPedidos.id = "lista-pedidos";

        btnListaProdutos.textContent = "Lista de Produtos";
        btnListaPedidos.textContent = "Lista de Pedidos";

        listagem1.appendChild(btnListaProdutos);
        listagem2.appendChild(btnListaPedidos);

        btnListaProdutos.addEventListener('click', listarProdutos);
        btnLogOut.addEventListener('click', logout);
    }
}