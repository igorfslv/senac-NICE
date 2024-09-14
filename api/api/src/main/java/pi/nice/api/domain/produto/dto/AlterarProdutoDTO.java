package pi.nice.api.domain.produto.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import pi.nice.api.domain.imagens.dto.AlterarImagemDTO;
import pi.nice.api.domain.imagens.dto.ImagemDTO;
import pi.nice.api.domain.imagens.dto.RegistrarImagemDTO;

import java.util.List;

public record AlterarProdutoDTO(
        @NotBlank
        Long id,
        @NotBlank
        String nome,
        @NotNull
        Double preco,
        @NotNull
        Integer qtdEstoque,
        @NotBlank
        String descricao,
        @NotNull
        Double avaliacao,
        @NotNull
        boolean ativo,
        List<RegistrarImagemDTO> imagens
) {
}
