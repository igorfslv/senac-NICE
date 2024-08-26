package pi.nice.api.domain.usuario;

import pi.nice.api.domain.grupo.Grupo;

public record UsuarioCadastradoDTO(String nome,
                                   String cpf,
                                   String email,
                                   String senha,
                                   Grupo grupoId) {

    public UsuarioCadastradoDTO {
    }

    public UsuarioCadastradoDTO(Usuario usuario) {
        this(usuario.getNome(), usuario.getCpf(), usuario.getEmail(), usuario.getSenha(), usuario.getGrupo());
    }
}
