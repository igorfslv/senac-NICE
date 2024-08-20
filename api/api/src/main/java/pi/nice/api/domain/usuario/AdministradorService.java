package pi.nice.api.domain.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdministradorService {

     @Autowired
     private UsuarioRepository usuarioRepository;

    public void cadastrarUsuario(Usuario usuario) {
        usuarioRepository.save(usuario);
    }

    public void alternarStatus(Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        if (usuario.isPresent()) {
            usuario.get().setAtivo(!usuario.get().isAtivo());
            usuarioRepository.save(usuario.get());
        } else {
            throw new RuntimeException("usuario nao encontrado");
        }
    }
}
