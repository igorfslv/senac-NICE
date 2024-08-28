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

    @PostMapping("/login")
    public ResponseEntity<UsuarioLoginRealizadoDTO> login(@RequestBody UsuarioLoginDTO usuarioLogin) {

        String idDoUsuario = usuarioService.logar(usuarioLogin);

        return idDoUsuario != null ?
                ResponseEntity.ok(new UsuarioLoginRealizadoDTO(idDoUsuario)) :
                ResponseEntity.notFound().build();

    }


}
