package pi.nice.api.domain.endereco.dto;

import pi.nice.api.domain.endereco.Endereco;

public record EnderecoDTO(
        Long id,
        String cep,
        String logradouro,
        String complemento,
        String cidade,
        int numero,
        String bairro,
        String uf,
        boolean enderecoPadrao
) {

    public EnderecoDTO(Endereco endereco) {
        this(endereco.getId(), endereco.getCep(), endereco.getLogradouro(), endereco.getComplemento(), endereco.getCidade(), endereco.getNumero(),endereco.getBairro(), endereco.getUf(), endereco.isEnderecoPadrao());

    }
}


