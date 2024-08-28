package pi.nice.api.domain.usuario;

import jakarta.persistence.*;
import lombok.*;
import pi.nice.api.domain.grupo.Grupo;
import pi.nice.api.domain.usuario.dto.UsuarioCadastroDTO;

@Table(name = "usuarios")
@Entity(name = "Usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String nome;
    private String cpf;
    private String email;
    private String senha;
    @Enumerated(EnumType.STRING)
    private Grupo grupo;
    private boolean ativo;

    public Usuario(String nome, String cpf, String email, Grupo grupoId) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.grupo = grupoId;
        ativo = true;
    }

    public Usuario(UsuarioCadastroDTO usuarioCadastroDTO, String senha) {
        this.nome = usuarioCadastroDTO.nome();
        this.cpf = usuarioCadastroDTO.cpf();
        this.email = usuarioCadastroDTO.email();
        this.grupo = usuarioCadastroDTO.grupoId();
        this.senha = senha;
        ativo = true;
    }
}
