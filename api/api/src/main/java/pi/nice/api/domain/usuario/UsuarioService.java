package pi.nice.api.domain.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pi.nice.api.domain.usuario.dto.UsuarioLoginDTO;
import pi.nice.api.domain.usuario.dto.UsuarioLoginRealizadoDTO;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity logar(UsuarioLoginDTO usuarioLogin) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(usuarioLogin.email());

        if (usuario.isPresent()) {
            if (passwordEncoder.matches(usuarioLogin.senha(), usuario.get().getSenha())) {
                return usuario.get().isAtivo() ? ResponseEntity.ok(new UsuarioLoginRealizadoDTO(usuario.get())) :
                        ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario '" + usuario.get().getNome() + "' está desativado");
            }
        }

        return ResponseEntity.notFound().build();
    }

}
