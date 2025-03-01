package pi.nice.api.domain.usuario;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, String> {

    Optional<Usuario> findByEmail(String email);
    Page<Usuario> findAll(Pageable pageable);
    Page<Usuario> findByNomeContaining(String nome, Pageable pageable);

}
