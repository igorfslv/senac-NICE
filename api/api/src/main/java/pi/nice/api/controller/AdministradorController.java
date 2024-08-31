package pi.nice.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pi.nice.api.domain.usuario.*;
import pi.nice.api.domain.usuario.dto.AlterarUsuarioDTO;
import pi.nice.api.domain.usuario.dto.UsuarioCadastradoDTO;
import pi.nice.api.domain.usuario.dto.UsuarioCadastroDTO;
import org.springframework.data.domain.Page;


@RestController
@RequestMapping("/admin")
public class AdministradorController {

    @Autowired
    private AdministradorService administradorService;

    @PostMapping("/cadastrar/{admId}")
    public ResponseEntity cadastrarUsuario(@RequestBody UsuarioCadastroDTO usuarioCadastroDTO,
                                           @PathVariable String admId) {

        Usuario usuarioCadastrado = administradorService.cadastrarUsuario(usuarioCadastroDTO, admId);
        return usuarioCadastrado != null ? ResponseEntity.status(HttpStatus.CREATED).body(new UsuarioCadastradoDTO(usuarioCadastrado)) :
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Você não é um administrador");
    }

    @PostMapping("/alternarStatus/{usuarioId}/{admId}")
    public ResponseEntity alternarStatusUsuario(@PathVariable String usuarioId,
                                                @PathVariable String admId) {

        return administradorService.alternarStatus(usuarioId, admId);
    }

    @GetMapping("/getUsuarios/{admId}/{numeroDaPagina}")
    public ResponseEntity getListaDeUsuarios(
            @PageableDefault Pageable pageable,
            @PathVariable String admId,
            @PathVariable int numeroDaPagina) {

        Page<Usuario> listaDeUsuarios = administradorService.getListaDeUsuarios(admId, PageRequest.of(numeroDaPagina, 10));
        return listaDeUsuarios != null ?
                ResponseEntity.ok(listaDeUsuarios.map(UsuarioCadastradoDTO::new)) :
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Você não é um administrador");

    }

    @PutMapping("/alterarUsuario/{admId}")
    public ResponseEntity alterarUsuario(
            @RequestBody AlterarUsuarioDTO alterarUsuarioDTO,
            @PathVariable String admId) {

        return administradorService.alterarUsuario(alterarUsuarioDTO, admId);
    }
}
