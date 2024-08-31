package pi.nice.api.domain.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import pi.nice.api.domain.grupo.Grupo;
import pi.nice.api.domain.usuario.dto.AlterarUsuarioDTO;
import pi.nice.api.domain.usuario.dto.AlternarUsuarioDTO;
import pi.nice.api.domain.usuario.dto.UsuarioCadastradoDTO;
import pi.nice.api.domain.usuario.dto.UsuarioCadastroDTO;

import java.util.List;
import java.util.Optional;

@Service
public class AdministradorService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario cadastrarUsuario(UsuarioCadastroDTO usuarioCadastroDTO, String idAdm) {

        if (possuiPermissaoDeAdm(idAdm)) {
            Usuario usuarioCadastrado = new Usuario(usuarioCadastroDTO, passwordEncoder.encode(usuarioCadastroDTO.senha()));
            usuarioRepository.save(usuarioCadastrado);
            return usuarioCadastrado;
        }

        return null;
    }

    public ResponseEntity alterarUsuario(AlterarUsuarioDTO alterarUsuarioDTO, String idAdm) {

        Optional<Usuario> usuario = usuarioRepository.findById(alterarUsuarioDTO.id());


        if (possuiPermissaoDeAdm(idAdm)) {
            if (usuario.isPresent()) {
                Usuario usuarioAlterado = usuario.get().alterarDados(alterarUsuarioDTO, passwordEncoder.encode(alterarUsuarioDTO.senha()));
                usuarioRepository.save(usuarioAlterado);
                return ResponseEntity.ok(new UsuarioCadastradoDTO(usuarioAlterado));

            } else {
                return ResponseEntity.notFound().build();
            }

        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Você não é um administrador");
    }

    public ResponseEntity alternarStatus(String usuarioId, String admId) {

        if (possuiPermissaoDeAdm(admId)) {
            Optional<Usuario> usuario = usuarioRepository.findById(usuarioId);
            if (usuario.isPresent()) {
                usuario.get().setAtivo(!usuario.get().isAtivo());
                usuarioRepository.save(usuario.get());
                return ResponseEntity.ok(new UsuarioCadastradoDTO(usuario.get()));
            } else {
                return ResponseEntity.notFound().build();
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Você não é um administrador");
    }

    public Page<Usuario> getListaDeUsuarios(String idAdm, Pageable pageable) {

        if (possuiPermissaoDeAdm(idAdm)) {
            return usuarioRepository.findAll(pageable);
        }

        return null;

    }

    private boolean possuiPermissaoDeAdm(String idAdm) {
        Optional<Usuario> usuario = usuarioRepository.findById(idAdm);
        if (usuario.isPresent()) {
            return usuario.get().getGrupo() == Grupo.ADMINISTRADOR;
        }

        return false;
    }
}
