package pi.nice.api.domain.pedido.dto;

import pi.nice.api.domain.cliente.Cliente;
import pi.nice.api.domain.pedido.Pedido;
import pi.nice.api.domain.pedido.StatusDeEntrega;

import java.util.Date;

public record PedidoFinalizadoDTO(
        Long id,
        Date data,
        double valorTotal,
        StatusDeEntrega statusDeEntrega
) {
    public PedidoFinalizadoDTO(Pedido pedido) {
        this(pedido.getId(), pedido.getData(), pedido.getValorTotal(), pedido.getStatusDeEntrega());
    }
}
