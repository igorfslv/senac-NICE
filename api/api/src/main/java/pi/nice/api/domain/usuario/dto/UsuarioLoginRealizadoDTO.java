package pi.nice.api.domain.usuario.dto;

import pi.nice.api.domain.grupo.Grupo;

public record UsuarioLoginRealizadoDTO(String id,
                                       String nome,
                                       String cpf,
                                       String email,
                                       Grupo grupoId) {
}
