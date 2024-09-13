package pi.nice.api.domain.produto;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pi.nice.api.domain.grupo.Grupo;
import pi.nice.api.domain.produto.dto.AlterarProdutoDTO;
import pi.nice.api.domain.produto.dto.ListarProdutoDTO;
import pi.nice.api.domain.produto.dto.ProdutoDTO;
import pi.nice.api.domain.produto.dto.RegistrarProdutoDTO;
import pi.nice.api.domain.usuario.Usuario;
import pi.nice.api.domain.usuario.UsuarioRepository;
import pi.nice.api.domain.usuario.dto.UsuarioCadastradoDTO;
import pi.nice.api.errors.RequestExceptionHandler;
import pi.nice.api.errors.exceptions.SemAutorizacaoException;

import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public ResponseEntity<?> novoProduto(RegistrarProdutoDTO registrarProdutoDTO){
        Produto novoProduto = new Produto(registrarProdutoDTO);
        produtoRepository.save(novoProduto);
        return ResponseEntity.ok(new ProdutoDTO(novoProduto));
    }

    public ResponseEntity<?> alterarProduto(String admId , AlterarProdutoDTO alterarProdutoDTO) {
        possuiPermissaoDeAdm(admId);
        Optional<Produto> optionalProduto = produtoRepository.findById(alterarProdutoDTO.id());
        Produto produto = produtoExistente(optionalProduto);
        produto.alterarDados(alterarProdutoDTO);
        return ResponseEntity.ok(new ProdutoDTO(produto));
    }

    public ResponseEntity<?> alternarStatusProduto(String admId, Long produtoId) {
        possuiPermissaoDeAdm(admId);
        Optional<Produto> optionalProduto = produtoRepository.findById(produtoId);
        Produto produto = produtoExistente(optionalProduto);
        produto.desativar();
        return ResponseEntity.ok(new ProdutoDTO(produto));
    }

    public ResponseEntity<?> getListaDeProdutos(String idAdm, PageRequest pageable, String nome) {
        return ResponseEntity.ok(produtoRepository.findByNomeContaining(nome != null ? nome : "", pageable).map(ListarProdutoDTO::new));
    }

    public ResponseEntity<?> getProduto(Long idProduto) {
        Optional<Produto> optionalProduto = produtoRepository.findById(idProduto);
        return ResponseEntity.ok(new ProdutoDTO(produtoExistente(optionalProduto)));

    }

    private Produto produtoExistente(Optional<Produto> produto) {
        if (produto.isPresent())
            return produto.get();
        throw new EntityNotFoundException("Produto não encontrado!");
    }

    private void possuiPermissaoDeAdm(String idAdm) {
        Optional<Usuario> usuario = usuarioRepository.findById(idAdm);
        if (usuario.isPresent())
            if (usuario.get().getGrupo() == Grupo.ADMINISTRADOR)
                return;
        throw new SemAutorizacaoException("Você não possui permissões de administrador.");

    }
}