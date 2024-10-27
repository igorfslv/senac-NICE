package pi.nice.api.domain.pedido.dto;

import pi.nice.api.domain.cliente.dto.ClienteCadastradoDTO;
import pi.nice.api.domain.endereco.dto.EnderecoDTO;
import pi.nice.api.domain.pedido.FormaDePagamento;
import pi.nice.api.domain.pedido.Pedido;
import pi.nice.api.domain.pedido.StatusDeEntrega;
import pi.nice.api.domain.pedido.TipoDeFrete;
import pi.nice.api.domain.produto.dto.ProdutoDTO;
import pi.nice.api.domain.produto.dto.VitrineProdutoDTO;
import pi.nice.api.domain.usuario.dto.UsuarioCadastradoDTO;

import java.util.List;

public record DetalhesPedidoDTO(
        EnderecoDTO endereco,
        FormaDePagamento formaDePagamento,
        StatusDeEntrega statusDeEntrega,
        TipoDeFrete tipoDeFrete,
        double valorTotal,
        List<DetalheItemPedidoDTO> itens


) {

    public DetalhesPedidoDTO(Pedido pedido) {
        this(new EnderecoDTO(pedido.getEndereco()), pedido.getFormaDePagamento(), pedido.getStatusDeEntrega(), pedido.getTipoDeFrete(), pedido.getValorTotal(),
                pedido.getItensPedido().stream().map(itemPedido -> new DetalheItemPedidoDTO(new VitrineProdutoDTO(itemPedido.getProduto()), itemPedido)).toList());
    }
}


