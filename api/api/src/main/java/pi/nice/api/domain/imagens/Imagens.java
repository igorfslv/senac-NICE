package pi.nice.api.domain.imagens;

import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "imagens")
@Entity(name = "Imagens")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Imagens {

    @Id
    private String id;

    @NotBlank
    private String id_produto;

    @NotBlank
    private String nome;

    @NotBlank
    private String caminho;

    @NotBlank
    private boolean principal;

}
