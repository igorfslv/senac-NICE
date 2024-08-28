package pi.nice.api.domain.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pi.nice.api.domain.usuario.dto.UsuarioLoginDTO;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public String logar(UsuarioLoginDTO usuarioLogin) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(usuarioLogin.email());

        if (usuario.isPresent()) {
            if (passwordEncoder.matches(usuarioLogin.senha(), usuario.get().getSenha())) {
                return usuario.get().getId();
            }
        }

        return null;
    }

}
