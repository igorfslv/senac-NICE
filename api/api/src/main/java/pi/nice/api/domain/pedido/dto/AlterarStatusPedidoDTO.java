package pi.nice.api.domain.pedido.dto;

import pi.nice.api.domain.pedido.StatusDeEntrega;

public record AlterarStatusPedidoDTO(
        long idPedido,
        StatusDeEntrega statusDeEntrega
) {
}
