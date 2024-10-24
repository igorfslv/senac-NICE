package pi.nice.api.domain.usuario;

import jakarta.persistence.*;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.UnexpectedTypeException;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.validator.constraints.br.CPF;
import pi.nice.api.domain.grupo.Grupo;
import pi.nice.api.domain.usuario.dto.AlterarUsuarioDTO;
import pi.nice.api.domain.usuario.dto.AlternarUsuarioDTO;
import pi.nice.api.domain.usuario.dto.UsuarioCadastroDTO;
import jakarta.validation.constraints.Email;
import pi.nice.api.errors.exceptions.SemAutorizacaoException;

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
    protected String id;
    @NotBlank
    @Size(min = 3, max = 36, message = "O nome de usuário deve ter entre 3 a 36 caracteres.")
    protected String nome;
    @CPF(message = "O CPF deve ser válido")
    @NotBlank
    protected String cpf;
    @Email(message = "O e-mail deve ser válido")
    @Size(max = 36, message = "O e-mail deve ter no maximo 256 caracteres.")
    @NotBlank
    protected String email;
    @NotBlank
    @Size(max = 60, message = "A senha deve ter no maximo 60 caracteres.")
    protected String senha;
    @Enumerated(EnumType.STRING)
    protected Grupo grupo;
    protected boolean ativo;


    public Usuario(UsuarioCadastroDTO usuarioCadastroDTO, String senha) {

        if(usuarioCadastroDTO.nome().split(" ").length > 1) {
            this.nome = usuarioCadastroDTO.nome();
        } else {
            throw new UnexpectedTypeException("O nome deve ter no minimo 2 palavras");
        }

        this.cpf = usuarioCadastroDTO.cpf();
        this.email = usuarioCadastroDTO.email();
        this.grupo = usuarioCadastroDTO.grupoId();
        this.senha = senha;
        ativo = true;
    }

    public Usuario(String nome, String cpf, String email, Grupo grupo, String senha) {
        if(nome.split(" ").length > 1) {
            this.nome = nome;
        } else {
            throw new UnexpectedTypeException("O nome deve ter no minimo 2 palavras");
        }
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.grupo = grupo;
        this.ativo = true;
    }


    public Usuario alterarDados(AlterarUsuarioDTO alternarUsuarioDTO, String senha) {
        if(alternarUsuarioDTO.nome().split(" ").length > 1) {
            this.nome = alternarUsuarioDTO.nome();
        } else {
            throw new UnexpectedTypeException("O nome deve ter no minimo 2 palavras");
        }
        this.cpf = alternarUsuarioDTO.cpf();
        this.grupo = alternarUsuarioDTO.grupoId();
        if (!(alternarUsuarioDTO.senha() == null || alternarUsuarioDTO.senha().isBlank()))
            this.senha = senha;
        this.ativo = alternarUsuarioDTO.ativo();
        return this;
    }
}
