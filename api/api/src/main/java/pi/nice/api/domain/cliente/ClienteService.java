package pi.nice.api.domain.cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pi.nice.api.domain.cliente.dto.AtualizarClienteDTO;
import pi.nice.api.domain.cliente.dto.ClienteCadastradoDTO;
import pi.nice.api.domain.cliente.dto.ClienteCadastroDTO;
import pi.nice.api.domain.endereco.Endereco;
import pi.nice.api.domain.endereco.EnderecoRepository;
import pi.nice.api.domain.endereco.dto.NovosEnderecosDeEntregaDTO;
import pi.nice.api.domain.usuario.dto.UsuarioLoginDTO;
import pi.nice.api.domain.usuario.dto.UsuarioLoginRealizadoDTO;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private EnderecoRepository enderecoRepository;


    public ResponseEntity<?> cadastrarCliente(ClienteCadastroDTO clienteCadastroDTO) {

        Cliente cliente = new Cliente(clienteCadastroDTO, passwordEncoder.encode(clienteCadastroDTO.senha()));
        clienteRepository.save(cliente);
        return ResponseEntity.ok(new ClienteCadastradoDTO(cliente));
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

    public ResponseEntity<?> login(UsuarioLoginDTO usuarioLoginDTO) {

        Optional<Cliente> cliente = clienteRepository.findByEmailAndAtivoTrue(usuarioLoginDTO.email());

        if (cliente.isPresent()) {
            if (passwordEncoder.matches(usuarioLoginDTO.senha(), cliente.get().getSenha()))
                return ResponseEntity.ok(new ClienteCadastradoDTO(cliente.get()));

        }


        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado ou credenciais inválidas");
    }

    public ResponseEntity<?> atualizarCliente(AtualizarClienteDTO atualizarClienteDTO, String id) {

        Optional<Cliente> cliente = clienteRepository.findById(id);
        if (cliente.isPresent()) {
            cliente.get().atualizarDados(atualizarClienteDTO, passwordEncoder.encode(atualizarClienteDTO.senha()));

            List<Endereco> enderecos = enderecoRepository.findAllByCliente(cliente.get());

            for (int i = 0; i < enderecos.size(); i++) {
                enderecos.get(i).setEnderecoPadrao(false);
            }

            enderecos.get(atualizarClienteDTO.enderecoPadrao() + 1).setEnderecoPadrao(true);

            clienteRepository.save(cliente.get());
            return ResponseEntity.ok(new ClienteCadastradoDTO(cliente.get()));
        }

        return ResponseEntity.notFound().build();
    }
}
