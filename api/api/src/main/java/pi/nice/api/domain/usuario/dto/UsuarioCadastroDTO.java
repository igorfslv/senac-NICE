package pi.nice.api.domain.usuario;

import pi.nice.api.domain.grupo.Grupo;

public record UsuarioCadastroDTO(
        String idDeQuemCadastrou,
        String nome,
        String cpf,
        String email,
        String senha,
        Grupo grupoId) {


}
