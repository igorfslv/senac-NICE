package pi.nice.api.controller;


import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.nice.api.domain.produto.ProdutoRepository;
import pi.nice.api.domain.produto.ProdutoService;
import pi.nice.api.domain.produto.dto.AlterarProdutoDTO;
import pi.nice.api.domain.produto.dto.RegistrarProdutoDTO;
import pi.nice.api.domain.usuario.Usuario;
import pi.nice.api.domain.usuario.dto.UsuarioCadastradoDTO;

import java.beans.Transient;
import java.security.Key;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @CrossOrigin
    @GetMapping("/getProdutos/{admId}/{numeroDaPagina}")
    public ResponseEntity<?> getListaDeProdutos(
            @PageableDefault Pageable pageable,
            @PathVariable String admId,
            @PathVariable int numeroDaPagina,
            @RequestParam(required = false) String nome) {

        return produtoService.getListaDeProdutos(admId, PageRequest.of(numeroDaPagina, 10), nome);

    }

    @CrossOrigin
    @PostMapping("/registrar")
    public ResponseEntity<?> registrarProduto(@RequestBody @Valid RegistrarProdutoDTO registrarProduto) {
        return produtoService.novoProduto(registrarProduto);
    }

    @CrossOrigin
    @GetMapping("/{produtoId}")
    public ResponseEntity<?> getProduto(@PathVariable Long produtoId) {
        return produtoService.getProduto(produtoId);
    }

    @Transactional
    @CrossOrigin
    @PutMapping("/alterar/{admId}")
    public ResponseEntity<?> alterarProduto(@PathVariable String admId,
                                         @RequestBody AlterarProdutoDTO alterarProdutoDTO) {
        return produtoService.alterarProduto(admId, alterarProdutoDTO);
    }

    @Transactional
    @CrossOrigin
    @DeleteMapping("/alternarStatus/{admId}/{produtoId}")
    public ResponseEntity<?> alternarStatusProduto(
            @PathVariable String admId,
            @PathVariable Long produtoId) {
        return produtoService.alternarStatusProduto(admId, produtoId);
    }
}
