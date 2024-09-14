package pi.nice.api.domain.imagens;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.autoconfigure.web.WebProperties;
import pi.nice.api.domain.imagens.dto.AlterarImagemDTO;
import pi.nice.api.domain.imagens.dto.ImagemDTO;
import pi.nice.api.domain.imagens.dto.RegistrarImagemDTO;
import pi.nice.api.domain.produto.Produto;

@Table(name = "imagens")
@Entity(name = "Imagem")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Imagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_produto")
    private Produto produto;
    private String nome;
    @NotBlank
    private String caminho;
    private boolean principal;

    public Imagem(RegistrarImagemDTO registrarImagemDTO, Produto produto) {
        this.caminho = registrarImagemDTO.caminho();
        this.principal = registrarImagemDTO.principal();
        this.produto = produto;
        String[] nomeSeparadoPorBarra = registrarImagemDTO.caminho().split("/");
        this.nome = registrarImagemDTO.caminho().split("/")[nomeSeparadoPorBarra.length - 1];
    }

}
