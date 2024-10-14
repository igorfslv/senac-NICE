package pi.nice.api.domain.cliente.dto;

import pi.nice.api.domain.cliente.Cliente;
import pi.nice.api.domain.endereco.dto.EnderecoDTO;
import pi.nice.api.domain.genero.Genere;
import pi.nice.api.domain.grupo.Grupo;

import java.util.Date;
import java.util.List;

public record ClienteCadastradoDTO(
        String id,
        String nome,
        String cpf,
        String email,
        String senha,
        Grupo grupoId,
        Date dataDeNascimento,
        Genere genere,
        EnderecoDTO enderecoDeFaturamento,
        List<EnderecoDTO> enderecosDeEntrega
) {
    public ClienteCadastradoDTO(Cliente cliente) {
        this(cliente.getId(), cliente.getNome(), cliente.getCpf(), cliente.getEmail(), cliente.getSenha(), cliente.getGrupo(), cliente.getDataDeNascimento(), cliente.getGenero(),
                new EnderecoDTO(cliente.getEnderecoDeFaturamento()), cliente.getEnderecosDeEntrega().stream()
                        .filter(endereco -> !endereco.getId().equals(cliente.getEnderecosDeEntrega().get(0).getId())).map(endereco ->
                        new EnderecoDTO(endereco)).toList());
    }
}
