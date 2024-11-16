package pi.nice.api.domain.pedido;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import pi.nice.api.domain.cliente.Cliente;
import pi.nice.api.domain.usuario.Usuario;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findAllByCliente(Cliente cliente);
    Page<Pedido> findAll(Pageable pageable);

}
