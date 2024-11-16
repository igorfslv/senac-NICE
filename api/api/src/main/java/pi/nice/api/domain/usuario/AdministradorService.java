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
import pi.nice.api.errors.exceptions.SemAutorizacaoException;

import java.util.List;
import java.util.Optional;

@Service
public class AdministradorService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario cadastrarUsuario(UsuarioCadastroDTO usuarioCadastroDTO, String idAdm) {

        possuiPermissaoDeAdm(idAdm);
        Usuario usuarioCadastrado = new Usuario(usuarioCadastroDTO, passwordEncoder.encode(usuarioCadastroDTO.senha()));
        usuarioRepository.save(usuarioCadastrado);
        return usuarioCadastrado;


    }

    public ResponseEntity alterarUsuario(AlterarUsuarioDTO alterarUsuarioDTO, String idAdm) {

        possuiPermissaoDeAdm(idAdm);
        Optional<Usuario> usuario = usuarioRepository.findById(alterarUsuarioDTO.id());
        if (usuario.isPresent()) {
            Usuario usuarioAlterado = usuario.get().alterarDados(alterarUsuarioDTO, passwordEncoder.encode(alterarUsuarioDTO.senha()));
            usuarioRepository.save(usuarioAlterado);
            return ResponseEntity.ok(new UsuarioCadastradoDTO(usuarioAlterado));

        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity alternarStatus(String usuarioId, String admId) {
        possuiPermissaoDeAdm(admId);
        Optional<Usuario> usuario = usuarioRepository.findById(usuarioId);
        if (usuario.isPresent()) {
            usuario.get().setAtivo(!usuario.get().isAtivo());
            usuarioRepository.save(usuario.get());
            return ResponseEntity.ok(new UsuarioCadastradoDTO(usuario.get()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public Page<Usuario> getListaDeUsuarios(String idAdm, Pageable pageable, String nome) {
        possuiPermissaoDeAdm(idAdm);
        return usuarioRepository.findByNomeContaining(nome != null ? nome : "", pageable);
    }

    public ResponseEntity<?> getUsuario(String idUsuario, String idAdm) {
        possuiPermissaoDeAdm(idAdm);
        return ResponseEntity.ok(new UsuarioCadastradoDTO(usuarioRepository.findById(idUsuario).get()));
    }

    private void possuiPermissaoDeAdm(String idAdm) {
        Optional<Usuario> usuario = usuarioRepository.findById(idAdm);
        if (usuario.isPresent())
            if (usuario.get().getGrupo() == Grupo.ADMINISTRADOR)
                return;
        throw new SemAutorizacaoException("Você não possui permissões de administrador.");

    }
}
