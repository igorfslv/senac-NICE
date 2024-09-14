package pi.nice.api.domain.imagens.dto;

public record AlterarImagemDTO (
        Long id,
        String caminho,
        boolean principal,
        boolean ativo
){
}
