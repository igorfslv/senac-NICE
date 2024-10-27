package pi.nice.api.domain.pedido.dto;

import pi.nice.api.domain.produto.Produto;

public record ProdutoQuantidadeDTO(
        Produto produto,
        int unidades
) {
}
