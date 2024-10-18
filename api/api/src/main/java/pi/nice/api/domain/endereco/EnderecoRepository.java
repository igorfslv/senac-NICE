package pi.nice.api.domain.endereco;

import org.springframework.data.jpa.repository.JpaRepository;
import pi.nice.api.domain.cliente.Cliente;

import java.util.List;

public interface EnderecoRepository extends JpaRepository<Endereco, Long> {

    List<Endereco> findAllByCliente(Cliente cliente);
}
