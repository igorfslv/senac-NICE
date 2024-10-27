package pi.nice.api.domain.pedido.dto;

import pi.nice.api.domain.produto.dto.ProdutoDTO;
import pi.nice.api.domain.produto.dto.VitrineProdutoDTO;

public record DetalheItemPedidoDTO(
        VitrineProdutoDTO produto,
        int unidades
) {

}
