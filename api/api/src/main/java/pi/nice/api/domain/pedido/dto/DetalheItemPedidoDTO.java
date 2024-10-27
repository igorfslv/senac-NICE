package pi.nice.api.domain.pedido.dto;

import pi.nice.api.domain.pedido.itempedido.ItemPedido;
import pi.nice.api.domain.produto.dto.ProdutoDTO;
import pi.nice.api.domain.produto.dto.VitrineProdutoDTO;

public record DetalheItemPedidoDTO(
        VitrineProdutoDTO produto,
        double valorUnitarioPago,
        double total,
        int unidades
) {

    public DetalheItemPedidoDTO(VitrineProdutoDTO produto, ItemPedido itemPedido) {
        this(produto, itemPedido.getPrecoUnitario(), itemPedido.getPrecoUnitario() * itemPedido.getUnidades(), itemPedido.getUnidades());
    }
}
