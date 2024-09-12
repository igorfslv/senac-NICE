package pi.nice.api.domain.produto;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pi.nice.api.domain.grupo.Grupo;
import pi.nice.api.domain.produto.dto.AlterarProdutoDTO;
import pi.nice.api.domain.produto.dto.RegistrarProdutoDTO;
import pi.nice.api.domain.usuario.Usuario;
import pi.nice.api.domain.usuario.UsuarioRepository;
import pi.nice.api.errors.RequestExceptionHandler;

import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public ResponseEntity novoProduto(RegistrarProdutoDTO registrarProdutoDTO){
        Produto novoProduto = new Produto(registrarProdutoDTO);
        produtoRepository.save(novoProduto);
        return ResponseEntity.ok().build();
    }

    public ResponseEntity alterarProduto(String id , AlterarProdutoDTO alterarProdutoDTO) {
        Optional<Produto> optionalProduto = produtoRepository.findById(id);

        if (optionalProduto.isPresent()) {
            Produto attProduto = optionalProduto.get().alterarDados(alterarProdutoDTO);
            produtoRepository.save(attProduto);
            return ResponseEntity.ok(attProduto);
        } else {
            throw new EntityNotFoundException();
        }
    }

    public ResponseEntity alterarProduto(AlterarProdutoDTO alterarProdutoDTO) {
        Optional<Produto> optionalProduto = produtoRepository.findById(alterarProdutoDTO.id());

        if (optionalProduto.isPresent()) {
            Produto attProduto = optionalProduto.get().alterarDados(alterarProdutoDTO);
            produtoRepository.save(attProduto);
            return ResponseEntity.ok(attProduto);
        } else {
            throw new EntityNotFoundException();
        }
    }

    public ResponseEntity statusProduto(String id) {
        Optional<Produto> optionalProduto = produtoRepository.findById(id);

        if(optionalProduto.isPresent()) {
            optionalProduto.get().setAtivo(!optionalProduto.get().isAtivo());
            produtoRepository.save(optionalProduto.get());
            return ResponseEntity.noContent().build();
        } else {
            throw new EntityNotFoundException();
        }
    }

}