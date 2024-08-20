package pi.nice.api.domain.usuario;

import pi.nice.api.domain.grupo.Grupo;

public record UsuarioCadastroDTO(
        String nome,
        String cpf,
        String email,
        Grupo grupoId) {
}
