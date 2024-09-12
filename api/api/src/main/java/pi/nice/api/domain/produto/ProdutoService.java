package pi.nice.api.domain.produto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pi.nice.api.domain.grupo.Grupo;
import pi.nice.api.domain.produto.dto.AlterarProdutoDTO;
import pi.nice.api.domain.usuario.Usuario;
import pi.nice.api.domain.usuario.UsuarioRepository;

import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

  /*  public ResponseEntity alterarProduto(AlterarProdutoDTO alterarProdutoDTO, String idAdm){

        Optional<Produto> produto = produtoRepository.findById(alterarProdutoDTO.id());

        if(possuiPermissaoAdm(idAdm)){
                produtoRepository.save(alterarProdutoDTO);
                return ResponseEntity.ok().build();

        } else {
            return ResponseEntity.notFound().build();
        }
    }
*/


    private boolean possuiPermissaoAdm(String idAdm){
        Optional<Usuario> usuario = usuarioRepository.findById(idAdm);
        return usuario.isPresent() ? usuario.get().getGrupo() == Grupo.ADMINISTRADOR : false;
    }

}
