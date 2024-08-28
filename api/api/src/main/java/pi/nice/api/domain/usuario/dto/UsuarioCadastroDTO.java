package pi.nice.api.domain.usuario.dto;

import pi.nice.api.domain.grupo.Grupo;

public record UsuarioCadastroDTO(
        String nome,
        String cpf,
        String email,
        String senha,
        Grupo grupoId) {


}
