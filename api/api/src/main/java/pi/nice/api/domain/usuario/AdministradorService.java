package pi.nice.api.domain.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import pi.nice.api.domain.grupo.Grupo;
import pi.nice.api.domain.usuario.dto.AlternarUsuarioDTO;
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



    public boolean alternarStatus(String usuarioId, String admId) {

        if (possuiPermissaoDeAdm(admId)) {
            Optional<Usuario> usuario = usuarioRepository.findById(usuarioId);
            if (usuario.isPresent()) {
                usuario.get().setAtivo(!usuario.get().isAtivo());
                usuarioRepository.save(usuario.get());
                return true;
            }
        }

        return false;
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
