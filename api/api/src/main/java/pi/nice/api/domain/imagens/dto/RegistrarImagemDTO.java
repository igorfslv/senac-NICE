package pi.nice.api.domain.imagens.dto;

import pi.nice.api.domain.imagens.Imagem;

public record RegistrarImagemDTO(
        String caminho,
        boolean principal) {

    public RegistrarImagemDTO(Imagem imagem) {
        this(imagem.getCaminho(), imagem.isPrincipal());
    }
}
