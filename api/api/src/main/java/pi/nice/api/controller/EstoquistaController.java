package pi.nice.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.nice.api.domain.pedido.dto.AlterarStatusPedidoDTO;
import pi.nice.api.domain.usuario.EstoquistaService;

@RestController
@RequestMapping("/estoquista")
public class EstoquistaController {

    @Autowired
    private EstoquistaService estoquistaService;

    @CrossOrigin
    @PutMapping("/pedido/alterarStatus/{idEstoquista}")
    public ResponseEntity<?> alterarStatusPedido(
            @RequestBody AlterarStatusPedidoDTO alterarStatusPedidoDTO,
            @PathVariable String idEstoquista) {

        System.out.println(alterarStatusPedidoDTO);
        return estoquistaService.alterarStatusPedido(idEstoquista, alterarStatusPedidoDTO.idPedido(), alterarStatusPedidoDTO.statusDeEntrega());

    }

    @CrossOrigin
    @GetMapping("/pedidos/{idEstoquista}/{numeroDaPagina}")
    public ResponseEntity<?> getListaDePedidos(@PageableDefault(sort = "id", direction = Sort.Direction.DESC, size = 10) Pageable pageable,
                                               @PathVariable int numeroDaPagina,
                                               @PathVariable String idEstoquista) {

        return estoquistaService.getListaDePedidos(idEstoquista, PageRequest.of(numeroDaPagina, pageable.getPageSize(), pageable.getSort()));

    }
}
