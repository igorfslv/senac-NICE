package pi.nice.api.domain.endereco;

import jakarta.persistence.*;
import lombok.*;
import pi.nice.api.domain.cliente.Cliente;
import pi.nice.api.domain.endereco.dto.EnderecoDTO;

@Table(name = "enderecos")
@Entity(name = "Endereco")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Endereco {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cep;
    private String logradouro;
    private String complemento;
    private String cidade;
    private int numero;
    private String bairro;
    private String uf;
    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;
    private boolean enderecoPadrao;

    public Endereco(EnderecoDTO enderecoCadastroDTO, Cliente cliente) {
        this.cep = enderecoCadastroDTO.cep();
        this.logradouro = enderecoCadastroDTO.logradouro();
        this.complemento = enderecoCadastroDTO.complemento();
        this.cidade = enderecoCadastroDTO.cidade();
        this.numero = enderecoCadastroDTO.numero();
        this.bairro = enderecoCadastroDTO.bairro();
        this.uf = enderecoCadastroDTO.uf();
        this.enderecoPadrao = enderecoCadastroDTO.enderecoPadrao();
        this.cliente = cliente;

    }


}
