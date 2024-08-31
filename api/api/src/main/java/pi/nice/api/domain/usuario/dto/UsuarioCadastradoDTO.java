package pi.nice.api.domain.usuario.dto;

import pi.nice.api.domain.grupo.Grupo;
import pi.nice.api.domain.usuario.Usuario;

public record UsuarioCadastradoDTO(String id,
                                   String nome,
                                   String cpf,
                                   String email,
                                   String senha,
                                   Grupo grupoId,
                                   boolean ativo) {

    public UsuarioCadastradoDTO {
    }

    public UsuarioCadastradoDTO(Usuario usuario) {
        this(usuario.getId(), usuario.getNome(), usuario.getCpf(), usuario.getEmail(), usuario.getSenha(), usuario.getGrupo(), usuario.isAtivo());
    }
}
