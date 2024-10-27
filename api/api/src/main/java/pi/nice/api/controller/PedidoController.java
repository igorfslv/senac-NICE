package pi.nice.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.nice.api.domain.pedido.PedidoService;
import pi.nice.api.domain.pedido.dto.FinalizarPedidoDTO;

@RestController
@RequestMapping("/pedido")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/finalizar")
    public ResponseEntity<?> finalizarPedido(@RequestBody FinalizarPedidoDTO pedidoFinalizadoDTO) {
        return pedidoService.finalizarPedido(pedidoFinalizadoDTO);
    }

    @GetMapping("/de/{idCliente}")
    public ResponseEntity<?> getPedidosDe(@PathVariable String idCliente) {
        return pedidoService.getPedidos(idCliente);
    }

    @GetMapping("/detalhes/{id}")
    public ResponseEntity<?> getDetalhes(@PathVariable Long id) {
        return pedidoService.getDetalhes(id);
    }

}
