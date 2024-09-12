package pi.nice.api.controller;


import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.nice.api.domain.produto.Produto;
import pi.nice.api.domain.produto.ProdutoRepository;
import pi.nice.api.domain.produto.dto.AlterarProdutoDTO;
import pi.nice.api.domain.produto.dto.RegistrarProdutoDTO;
import java.util.Optional;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping
    public ResponseEntity getAllProducts(){
        var allProdutos = produtoRepository.findAllByAtivoTrue();
        return ResponseEntity.ok(allProdutos);
    }

    @PostMapping
    public ResponseEntity registrarProduto(@RequestBody @Valid RegistrarProdutoDTO registrarProduto){
        Produto novoProduto = new Produto(registrarProduto);
        produtoRepository.save(novoProduto);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    @Transactional
    public ResponseEntity alterarProduto(@RequestBody @Valid AlterarProdutoDTO alterarProduto){
        Optional<Produto> optionalProduto = produtoRepository.findById(alterarProduto.id());
        if (optionalProduto.isPresent()) {
            Produto attProduto = optionalProduto.get();
            attProduto.setNome(alterarProduto.nome());
            attProduto.setPreco(alterarProduto.preco());
            attProduto.setQtd_estoque(alterarProduto.qtd_estoque());
            attProduto.setDescricao(alterarProduto.descricao());
            attProduto.setAvaliacao(alterarProduto.avaliacao());
            attProduto.setAtivo(alterarProduto.ativo());
            return ResponseEntity.ok(attProduto);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity inativarProduto(@PathVariable String id) {
        Optional<Produto> optionalProduto = produtoRepository.findById(id);
        if (optionalProduto.isPresent()) {
            Produto attProduto = optionalProduto.get();
            attProduto.setAtivo(false);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
