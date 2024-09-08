package pi.nice.api.domain.usuario.dto;

import pi.nice.api.domain.grupo.Grupo;
import pi.nice.api.domain.usuario.Usuario;

public record UsuarioLoginRealizadoDTO(String id,
                                       String nome,
                                       String cpf,
                                       String email,
                                       Grupo grupoId) {

    public UsuarioLoginRealizadoDTO(Usuario usuario) {
        this(usuario.getId(), usuario.getNome(), usuario.getCpf(), usuario.getEmail(), usuario.getGrupo());
    }
}
