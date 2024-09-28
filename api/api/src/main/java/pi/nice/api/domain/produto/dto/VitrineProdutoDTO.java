package pi.nice.api.domain.produto.dto;

public record VitrineProdutoDTO(
        Long id,
        String caminho,
        String nome,
        double preco

) {
}
