package pi.nice.api.domain.cliente;

import jakarta.persistence.*;
import lombok.*;
import pi.nice.api.domain.cliente.dto.ClienteCadastroDTO;
import pi.nice.api.domain.endereco.Endereco;
import pi.nice.api.domain.endereco.dto.NovosEnderecosDeEntregaDTO;
import pi.nice.api.domain.genero.Genere;
import pi.nice.api.domain.usuario.Usuario;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Table(name = "clientes")
@Entity(name = "Cliente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cliente extends Usuario {

    private Date dataDeNascimento;
    @Enumerated(EnumType.STRING)
    private Genere genero;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Endereco> enderecosDeEntrega = new ArrayList<>();

    @OneToOne(mappedBy = "cliente", cascade = CascadeType.ALL)
    private Endereco enderecoDeFaturamento;



    public Cliente(ClienteCadastroDTO clienteDTO, String senha) {
        super(clienteDTO.nome(), clienteDTO.cpf(),clienteDTO.email(), clienteDTO.grupoId(), senha);
        System.out.println(clienteDTO);
        this.enderecosDeEntrega.addAll(clienteDTO.enderecosDeEntrega().stream().map(enderecoCadastroDTO -> new Endereco(enderecoCadastroDTO, this)).toList());

        this.enderecoDeFaturamento = new Endereco(clienteDTO.enderecoDeFaturamento(), this);
        this.dataDeNascimento = clienteDTO.dataDeNascimento();
        this.genero = clienteDTO.genere();

    }


    public void addNovosEnderecos(NovosEnderecosDeEntregaDTO novosEnderecos) {
        this.enderecosDeEntrega.addAll(novosEnderecos.novosEnderecos().stream()
                .map(enderecoDTO -> new Endereco(enderecoDTO, this)).toList());
    }
}
