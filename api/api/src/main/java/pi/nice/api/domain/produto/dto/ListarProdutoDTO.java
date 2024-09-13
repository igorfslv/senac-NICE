package pi.nice.api.domain.produto.dto;

import pi.nice.api.domain.produto.Produto;

public record ListarProdutoDTO(
        Long id,
        String nome,
        Integer qtdEstoque,
        Double preco,
        boolean ativo

) {

    public ListarProdutoDTO(Produto produto) {
        this(produto.getId(), produto.getNome(), produto.getQtd_estoque(), produto.getPreco(), produto.isAtivo());
    }
}
