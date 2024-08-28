package pi.nice.api.domain.usuario.dto;

import pi.nice.api.domain.grupo.Grupo;
import pi.nice.api.domain.usuario.Usuario;

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
