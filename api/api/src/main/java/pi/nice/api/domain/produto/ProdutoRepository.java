package pi.nice.api.domain.produto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pi.nice.api.domain.usuario.Usuario;

import java.util.List;
import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    List<Produto> findAllByAtivoTrue();
    Page<Produto> findByNomeContainingAndAtivoTrue(String nome, Pageable pageable);
    Page<Produto> findByNomeContaining(String nome, Pageable pageable);

}
