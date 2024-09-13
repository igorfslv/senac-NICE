package pi.nice.api.domain.imagens.dto;

import pi.nice.api.domain.imagens.Imagem;

public record ImagemDTO(
        Long id,
        String nome,
        String caminho,
        boolean principal
) {

    public ImagemDTO(Imagem imagem) {
        this(imagem.getId(), imagem.getNome(), imagem.getCaminho(), imagem.isPrincipal());
    }
}
