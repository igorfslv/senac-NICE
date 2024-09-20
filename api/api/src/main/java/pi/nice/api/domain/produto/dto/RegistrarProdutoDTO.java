package pi.nice.api.domain.produto.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import pi.nice.api.domain.imagens.Imagem;
import pi.nice.api.domain.imagens.dto.RegistrarImagemDTO;

import java.util.List;

public record RegistrarProdutoDTO(
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
        List<RegistrarImagemDTO> imagens
) {


}
