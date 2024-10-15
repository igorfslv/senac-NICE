package pi.nice.api.domain.cliente;

import org.springframework.data.jpa.repository.JpaRepository;
import pi.nice.api.domain.usuario.Usuario;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, String> {

    Optional<Cliente> findByEmailAndAtivoTrue(String email);

}
