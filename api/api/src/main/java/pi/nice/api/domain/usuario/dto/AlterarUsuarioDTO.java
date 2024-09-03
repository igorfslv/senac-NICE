package pi.nice.api.domain.usuario.dto;

import pi.nice.api.domain.grupo.Grupo;

public record AlterarUsuarioDTO(String id,
                                String nome,
                                String cpf,
                                String senha,
                                Grupo grupoId,
                                boolean ativo) {
}
