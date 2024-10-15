package pi.nice.api.domain.endereco;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import pi.nice.api.domain.cliente.Cliente;
import pi.nice.api.domain.endereco.dto.EnderecoDTO;

@Table(name = "endereco_de_faturamento")
@Entity(name = "EnderecoDeFaturamento")
@Getter
@Setter
@AllArgsConstructor
public class EnderecoDeFaturamento extends Endereco{

    public EnderecoDeFaturamento(EnderecoDTO enderecoDTO, Cliente cliente) {
        super(enderecoDTO, cliente);

    }


}
