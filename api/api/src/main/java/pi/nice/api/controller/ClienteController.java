package pi.nice.api.controller;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.nice.api.domain.cliente.dto.AtualizarClienteDTO;
import pi.nice.api.domain.cliente.dto.ClienteCadastroDTO;
import pi.nice.api.domain.cliente.ClienteService;
import pi.nice.api.domain.endereco.dto.EnderecoDTO;
import pi.nice.api.domain.endereco.dto.NovosEnderecosDeEntregaDTO;
import pi.nice.api.domain.usuario.dto.UsuarioLoginDTO;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @CrossOrigin
    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastroClietne(@RequestBody ClienteCadastroDTO clienteDTO) {
        System.out.println("dggdfgdf " + clienteDTO);
        return clienteService.cadastrarCliente(clienteDTO);
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<?> getPorId(@PathVariable String id) {
        return clienteService.getClientePorId(id);
    }

    @CrossOrigin
    @PutMapping("/adicionarEnderecos/{id}")
    public ResponseEntity<?> addNovosEnderecosDeEntrega(@RequestBody NovosEnderecosDeEntregaDTO novosEnderecosDeEntregaDTO, @PathVariable String id) {
        return clienteService.addNovosEnderecosDeEntrega(novosEnderecosDeEntregaDTO, id);
    }

    @CrossOrigin
    @Transactional
    @PutMapping("/atualizar/{id}")
    public ResponseEntity<?> atualizarCliente(@RequestBody AtualizarClienteDTO atualizarClienteDTO, @PathVariable String id) {
        System.out.println("sdfdsfdfs");
        return clienteService.atualizarCliente(atualizarClienteDTO, id);
    }

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<?> loginCliente(@RequestBody UsuarioLoginDTO usuarioLoginDTO) {
        return clienteService.login(usuarioLoginDTO);
    }

}
