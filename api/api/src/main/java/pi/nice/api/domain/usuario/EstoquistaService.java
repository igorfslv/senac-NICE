package pi.nice.api.domain.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pi.nice.api.domain.grupo.Grupo;
import pi.nice.api.domain.pedido.PedidoRepository;
import pi.nice.api.domain.pedido.StatusDeEntrega;
import pi.nice.api.domain.pedido.dto.DetalhesPedidoDTO;
import pi.nice.api.domain.pedido.dto.PedidoFinalizadoDTO;
import pi.nice.api.errors.exceptions.SemAutorizacaoException;

import java.util.Optional;

@Service
public class EstoquistaService {

    @Autowired
    private PedidoRepository pedidoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public ResponseEntity<?> getListaDePedidos(String idEstoquista, Pageable pageable) {
        possuiPermissaoDeEstoquista(idEstoquista);
        return ResponseEntity.ok(pedidoRepository.findAll(pageable).map(PedidoFinalizadoDTO::new));

    }

    @Transactional
    public ResponseEntity<?> alterarStatusPedido(String idEstoquista, long idPedido, StatusDeEntrega statusDeEntrega) {
        possuiPermissaoDeEstoquista(idEstoquista);

        var pedido = pedidoRepository.findById(idPedido);

        if (pedido.isPresent()) {
            pedido.get().setStatusDeEntrega(statusDeEntrega);
            return ResponseEntity.ok(new DetalhesPedidoDTO(pedido.get()));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pedido " + idPedido + " não encontrado.");



    }

    private void possuiPermissaoDeEstoquista(String idEstoquista) {
        Optional<Usuario> usuario = usuarioRepository.findById(idEstoquista);
        if (usuario.isPresent())
            if (usuario.get().getGrupo() == Grupo.ESTOQUISTA)
                return;
        throw new SemAutorizacaoException("Você não possui permissões de estoquista.");

    }



}
