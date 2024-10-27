package pi.nice.api.domain.produto.dto;

import pi.nice.api.domain.produto.Produto;

public record VitrineProdutoDTO(
        Long id,
        String caminho,
        String nome,
        double preco

) {

    public VitrineProdutoDTO(Produto produto) {
        this(produto.getId(), produto.getImagemPrincipal().getCaminho(), produto.getNome(), produto.getPreco());
    }
}
