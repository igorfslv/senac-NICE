package pi.nice.api.domain.cliente.dto;

import pi.nice.api.domain.endereco.dto.EnderecoDTO;
import pi.nice.api.domain.genero.Genere;

import java.util.Date;
import java.util.List;

public record AtualizarClienteDTO(
        String nome,
        String cpf,
        Date dataDeNascimento,
        Genere genere,
        List<EnderecoDTO> enderecosDeEntrega,
        int enderecoPadrao,
        String senha
) {
}

