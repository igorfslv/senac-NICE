package pi.nice.api.domain.cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pi.nice.api.domain.cliente.dto.ClienteCadastradoDTO;
import pi.nice.api.domain.cliente.dto.ClienteCadastroDTO;
import pi.nice.api.domain.endereco.dto.NovosEnderecosDeEntregaDTO;

import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<?> cadastrarCliente(ClienteCadastroDTO clienteCadastroDTO) {

        clienteRepository.save(new Cliente(clienteCadastroDTO, passwordEncoder.encode(clienteCadastroDTO.senha())));
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<?> getListaClientes() {
        return ResponseEntity.ok(clienteRepository.findAll());
    }

    public ResponseEntity<?> getClientePorId(String id) {

        Optional<Cliente> cliente = clienteRepository.findById(id);

        if (cliente.isPresent()) {
            return ResponseEntity.ok(new ClienteCadastradoDTO(cliente.get()));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado");

    }

    public ResponseEntity<?> addNovosEnderecosDeEntrega(NovosEnderecosDeEntregaDTO novosEnderecos, String id) {
        Optional<Cliente> cliente = clienteRepository.findById(id);

        if (cliente.isPresent()) {
            cliente.get().addNovosEnderecos(novosEnderecos);
            return ResponseEntity.ok("Endereços adicionados com sucesso!");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado");
    }
}
