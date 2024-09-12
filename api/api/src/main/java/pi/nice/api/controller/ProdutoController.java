package pi.nice.api.controller;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.nice.api.domain.produto.ProdutoRepository;
import pi.nice.api.domain.produto.ProdutoService;
import pi.nice.api.domain.produto.dto.AlterarProdutoDTO;
import pi.nice.api.domain.produto.dto.RegistrarProdutoDTO;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ProdutoService produtoService;


/*
    @GetMapping
    public ResponseEntity allProdutos(){
        var allProdutos = produtoRepository.findAll();
        return ResponseEntity.ok(allProdutos);
    }
*/

    @GetMapping
    public ResponseEntity allProdutosAtivos(){
        var allProdutosAtivos = produtoRepository.findAllByAtivoTrue();
        return ResponseEntity.ok(allProdutosAtivos);
    }

    @PostMapping
    public ResponseEntity registrarProduto(@RequestBody @Valid RegistrarProdutoDTO registrarProduto){
       return produtoService.novoProduto(registrarProduto);
    }

    @CrossOrigin @PutMapping("/{id}")
    public ResponseEntity alterarProduto(@PathVariable String id, @RequestBody AlterarProdutoDTO alterarProdutoDTO){
        return produtoService.alterarProduto(id, alterarProdutoDTO);
    }

    @CrossOrigin @PutMapping()
    public ResponseEntity alterarProduto(@RequestBody AlterarProdutoDTO alterarProdutoDTO){
       return produtoService.alterarProduto(alterarProdutoDTO);
    }

    @CrossOrigin @DeleteMapping("/{id}")
    public ResponseEntity statusProduto(@PathVariable String id) {
        return produtoService.statusProduto(id);
    }
}
