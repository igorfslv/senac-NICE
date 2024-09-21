const grupoUsuarioLogado = document.querySelector('.grupo-usuario-logado');
const admIdObj = JSON.parse(localStorage.getItem('usuarioLogado'));

export function verificarGrupoUsuarioLogado() {
    if (admIdObj.grupoId === "ADMINISTRADOR") {
        return "ADMINISTRADOR";
    }
    else if (admIdObj.grupoId === "ESTOQUISTA") {
        return "ESTOQUISTA";
    }
}