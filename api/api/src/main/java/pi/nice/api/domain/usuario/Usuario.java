package pi.nice.api.domain.usuario;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.validator.constraints.br.CPF;
import pi.nice.api.domain.grupo.Grupo;
import pi.nice.api.domain.usuario.dto.AlterarUsuarioDTO;
import pi.nice.api.domain.usuario.dto.AlternarUsuarioDTO;
import pi.nice.api.domain.usuario.dto.UsuarioCadastroDTO;
import jakarta.validation.constraints.Email;

@Inheritance(strategy = InheritanceType.JOINED)
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
    @NotBlank
    @Size(min = 3, max = 36, message = "O nome de usuário deve ter entre 3 a 36 caracteres.")
    private String nome;
    @CPF(message = "O CPF deve ser válido")
    @NotBlank
    private String cpf;
    @Email(message = "O e-mail deve ser válido")
    @Size(max = 36, message = "O e-mail deve ter no maximo 256 caracteres.")
    @NotBlank
    private String email;
    @NotBlank
    @Size(max = 60, message = "A senha deve ter no maximo 60 caracteres.")
    private String senha;
    @Enumerated(EnumType.STRING)
    private Grupo grupo;
    private boolean ativo;


    public Usuario(UsuarioCadastroDTO usuarioCadastroDTO, String senha) {
        this.nome = usuarioCadastroDTO.nome();
        this.cpf = usuarioCadastroDTO.cpf();
        this.email = usuarioCadastroDTO.email();
        this.grupo = usuarioCadastroDTO.grupoId();
        this.senha = senha;
        ativo = true;
    }

    public Usuario(String nome, String cpf, String email, Grupo grupo, String senha) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.grupo = grupo;
        this.ativo = true;
    }


    public Usuario alterarDados(AlterarUsuarioDTO alternarUsuarioDTO, String senha) {
        this.nome = alternarUsuarioDTO.nome();
        this.cpf = alternarUsuarioDTO.cpf();
        this.grupo = alternarUsuarioDTO.grupoId();
        if (!(alternarUsuarioDTO.senha() == null || alternarUsuarioDTO.senha().isBlank()))
            this.senha = senha;
        this.ativo = alternarUsuarioDTO.ativo();
        return this;
    }
}
