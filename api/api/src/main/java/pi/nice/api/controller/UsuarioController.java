package pi.nice.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.nice.api.domain.usuario.*;
import pi.nice.api.domain.usuario.dto.UsuarioLoginDTO;
import pi.nice.api.domain.usuario.dto.UsuarioLoginRealizadoDTO;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<UsuarioLoginRealizadoDTO> login(@RequestBody UsuarioLoginDTO usuarioLogin) {

        Usuario usuario = usuarioService.logar(usuarioLogin);

        return usuario != null ?
                ResponseEntity.ok(new UsuarioLoginRealizadoDTO(
                        usuario.getId(),
                        usuario.getNome(),
                        usuario.getCpf(),
                        usuario.getEmail(),
                        usuario.getGrupo())
                ) :
                ResponseEntity.notFound().build();
    }
}
