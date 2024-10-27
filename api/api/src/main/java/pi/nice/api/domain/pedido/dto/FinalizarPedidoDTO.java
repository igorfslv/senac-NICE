package pi.nice.api.domain.pedido.dto;

import pi.nice.api.domain.pedido.FormaDePagamento;
import pi.nice.api.domain.pedido.StatusDeEntrega;
import pi.nice.api.domain.pedido.TipoDeFrete;
import pi.nice.api.domain.pedido.itempedido.ItemPedido;

import java.util.List;

public record FinalizarPedidoDTO(
        String idCliente,
        Long idEndereco,
        FormaDePagamento formaDePagamento,
        StatusDeEntrega statusDeEntrega,
        TipoDeFrete tipoDeFrete,
        double valorTotal,
        List<FinalizarItemPedidoDTO> itens

) {

}
