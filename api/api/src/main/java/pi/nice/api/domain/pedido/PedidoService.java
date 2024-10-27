package pi.nice.api.domain.pedido;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import pi.nice.api.domain.cliente.ClienteRepository;
import pi.nice.api.domain.endereco.Endereco;
import pi.nice.api.domain.endereco.EnderecoRepository;
import pi.nice.api.domain.pedido.dto.DetalhesPedidoDTO;
import pi.nice.api.domain.pedido.dto.FinalizarPedidoDTO;
import pi.nice.api.domain.pedido.dto.PedidoFinalizadoDTO;
import pi.nice.api.domain.pedido.dto.ProdutoQuantidadeDTO;
import pi.nice.api.domain.pedido.itempedido.ItemPedido;
import pi.nice.api.domain.produto.ProdutoRepository;
import pi.nice.api.domain.usuario.Usuario;
import pi.nice.api.domain.usuario.UsuarioRepository;

import java.util.Date;

@Service
public class PedidoService {

    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private ProdutoRepository produtoRepository;
    @Autowired
    private EnderecoRepository enderecoRepository;
    @Autowired
    private PedidoRepository pedidoRepository;

    public ResponseEntity<?> finalizarPedido(FinalizarPedidoDTO pedidoFinalizadoDTO) {

        var cliente = clienteRepository.findById(pedidoFinalizadoDTO.idCliente());
        var endereco = enderecoRepository.findById(pedidoFinalizadoDTO.idEndereco());

        if (cliente.isPresent() && endereco.isPresent()) {
            Pedido pedido = new Pedido(cliente.get(), endereco.get(),
                    pedidoFinalizadoDTO.formaDePagamento(),
                    pedidoFinalizadoDTO.statusDeEntrega(),
                    pedidoFinalizadoDTO.tipoDeFrete(),
                    pedidoFinalizadoDTO.valorTotal(),
                    pedidoFinalizadoDTO.itens().stream().map(
                            finalizarItemPedidoDTO -> new ProdutoQuantidadeDTO(
                                    produtoRepository.findById(finalizarItemPedidoDTO.idProduto()).get(),
                                    finalizarItemPedidoDTO.unidades()))
                            .toList());
            pedidoRepository.save(pedido);
            return ResponseEntity.ok(new DetalhesPedidoDTO(pedido));
        }


            return ResponseEntity.badRequest().body("asdasd");

    }

    public ResponseEntity<?> getPedidos(String idCliente) {

        var cliente = clienteRepository.findById(idCliente);

        if (cliente.isPresent()) {
            return ResponseEntity.ok(pedidoRepository.findAllByCliente(cliente.get()).stream().map(PedidoFinalizadoDTO::new));

        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente com o id " + idCliente + " não encontrado");

    }

    public ResponseEntity<?> getDetalhes(Long id) {
        var pedido = pedidoRepository.findById(id);

        if (pedido.isPresent()) {
            return ResponseEntity.ok(new DetalhesPedidoDTO(pedido.get()));

        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pedido com o id " + id + " não encontrado");
    }
}
