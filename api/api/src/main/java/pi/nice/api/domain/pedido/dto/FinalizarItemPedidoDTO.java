package pi.nice.api.domain.pedido.dto;

public record FinalizarItemPedidoDTO(
        Long idProduto,
        int unidades
) {
}
