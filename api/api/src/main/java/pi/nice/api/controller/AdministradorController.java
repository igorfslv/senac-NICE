package pi.nice.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.nice.api.domain.usuario.AdministradorService;
import pi.nice.api.domain.usuario.Usuario;
import pi.nice.api.domain.usuario.UsuarioCadastroDTO;

@RestController
@RequestMapping("/admin")
public class AdministradorController {

    @Autowired
    private AdministradorService administradorService;

    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrarUsuario(@RequestBody UsuarioCadastroDTO usuarioCadastroDTO) {

        administradorService.cadastrarUsuario(new Usuario(usuarioCadastroDTO));
        return ResponseEntity.ok("ok");
    }

    @PostMapping("/alternarStatus/{idUsuario}")
    public ResponseEntity<String> cadastrarUsuario(@PathVariable Long idUsuario) {
        administradorService.alternarStatus(idUsuario);
        return ResponseEntity.ok("ok");
    }
}
