package pi.nice.api.domain.imagens;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import pi.nice.api.domain.produto.Produto;

import java.util.List;



public interface ImagemRepository extends JpaRepository<Produto, Long> {

}