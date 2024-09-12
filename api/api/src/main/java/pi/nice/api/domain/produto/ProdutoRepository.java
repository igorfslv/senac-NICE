package pi.nice.api.domain.produto;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto, String> {

    List<Produto> findAllByAtivoTrue();
}
