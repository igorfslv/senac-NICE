package pi.nice.api.domain.produto.dto;

import pi.nice.api.domain.imagens.Imagem;
import pi.nice.api.domain.imagens.dto.ImagemDTO;
import pi.nice.api.domain.produto.Produto;

import java.util.List;

public record ProdutoDTO (
        Long id,
        String nome,
        Double preco,
        Integer qtdEstoque,
        String descricao,
        Double avaliacao,
        boolean ativo,
        List<ImagemDTO> imagens
){

    public ProdutoDTO(Produto produto) {
        this(produto.getId(),
                produto.getNome(),
                produto.getPreco(),
                produto.getQtd_estoque(),
                produto.getDescricao(),
                produto.getAvaliacao(),
                produto.isAtivo(),
                produto.getImagens().stream().map(imagem -> new ImagemDTO(imagem)).toList());

    }
}
