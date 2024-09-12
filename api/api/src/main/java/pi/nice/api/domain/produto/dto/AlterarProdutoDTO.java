package pi.nice.api.domain.produto.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AlterarProdutoDTO(
        @NotBlank
        String id,
        @NotBlank
        String nome,
        @NotNull
        Double preco,
        @NotNull
        Integer qtd_estoque,
        @NotBlank
        String descricao,
        @NotNull
        Double avaliacao,
        @NotNull
        boolean ativo) {
}
