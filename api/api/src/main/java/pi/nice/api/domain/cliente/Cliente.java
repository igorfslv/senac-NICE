package pi.nice.api.domain.cliente;

import jakarta.persistence.*;
import lombok.*;
import pi.nice.api.domain.cliente.dto.AtualizarClienteDTO;
import pi.nice.api.domain.cliente.dto.ClienteCadastroDTO;
import pi.nice.api.domain.endereco.Endereco;
import pi.nice.api.domain.endereco.EnderecoDeFaturamento;
import pi.nice.api.domain.endereco.dto.EnderecoDTO;
import pi.nice.api.domain.endereco.dto.NovosEnderecosDeEntregaDTO;
import pi.nice.api.domain.genero.Genere;
import pi.nice.api.domain.grupo.Grupo;
import pi.nice.api.domain.usuario.Usuario;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_endereco_de_faturamento", unique = true)
    private EnderecoDeFaturamento enderecoDeFaturamento;



    public Cliente(ClienteCadastroDTO clienteDTO, String senha) {
        super(clienteDTO.nome(), clienteDTO.cpf(),clienteDTO.email(), Grupo.CLIENTE, senha);
        System.out.println(clienteDTO);
        this.enderecosDeEntrega.add(new Endereco(clienteDTO.enderecoDeEntrega(), this));
        this.enderecoDeFaturamento = new EnderecoDeFaturamento(clienteDTO.enderecoDeFaturamento(), this);
        this.dataDeNascimento = clienteDTO.dataDeNascimento();
        this.genero = clienteDTO.genere();


    }


    public void addNovosEnderecos(NovosEnderecosDeEntregaDTO novosEnderecos) {
        this.enderecosDeEntrega.addAll(novosEnderecos.novosEnderecos().stream()
                .map(enderecoDTO -> new Endereco(enderecoDTO, this)).toList());
    }

    public void atualizarDados(AtualizarClienteDTO atualizarClienteDTO, String senha) {
        this.nome = atualizarClienteDTO.nome();
        this.cpf = atualizarClienteDTO.cpf();
        this.dataDeNascimento = atualizarClienteDTO.dataDeNascimento();
        this.genero = atualizarClienteDTO.genere();
        this.enderecosDeEntrega.addAll(atualizarClienteDTO.enderecosDeEntrega().stream()
                .map(enderecoDTO -> new Endereco(enderecoDTO, this)).toList());
//        for (int i = 1; i < enderecosDeEntrega.size(); i++) {
//            enderecosDeEntrega.get(i).setEnderecoPadrao(false);
//        }
//
//        this.enderecosDeEntrega.get(atualizarClienteDTO.enderecoPadrao() + 1).setEnderecoPadrao(true);

        if (!(atualizarClienteDTO.senha() == null || atualizarClienteDTO.senha().isBlank()))
            this.senha = senha;
    }


}
