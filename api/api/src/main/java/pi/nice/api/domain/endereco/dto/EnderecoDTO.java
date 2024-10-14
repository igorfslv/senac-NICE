package pi.nice.api.domain.endereco.dto;

import pi.nice.api.domain.endereco.Endereco;

public record EnderecoDTO(
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
        this(endereco.getCep(), endereco.getLogradouro(), endereco.getComplemento(), endereco.getCidade(), endereco.getNumero(),endereco.getBairro(), endereco.getUf(), endereco.isEnderecoPadrao());

    }
}


