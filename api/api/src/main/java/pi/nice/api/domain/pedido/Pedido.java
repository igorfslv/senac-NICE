package pi.nice.api.domain.pedido;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pi.nice.api.domain.cliente.Cliente;
import pi.nice.api.domain.endereco.Endereco;
import pi.nice.api.domain.endereco.EnderecoRepository;
import pi.nice.api.domain.pedido.dto.FinalizarItemPedidoDTO;
import pi.nice.api.domain.pedido.dto.ProdutoQuantidadeDTO;
import pi.nice.api.domain.pedido.itempedido.ItemPedido;
import pi.nice.api.domain.produto.Produto;
import pi.nice.api.domain.usuario.Usuario;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity(name = "pedido")
@Table(name = "pedidos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Pedido {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;
    @ManyToOne
    @JoinColumn(name = "id_endereco")
    private Endereco endereco;

    @Enumerated(EnumType.STRING)
    private TipoDeFrete tipoDeFrete;

    @Enumerated(EnumType.STRING)
    private FormaDePagamento formaDePagamento;

    @Enumerated(EnumType.STRING)
    private StatusDeEntrega statusDeEntrega;

    private double valorTotal;
    private Date data;
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemPedido> itensPedido = new ArrayList<>();

    public Pedido(Cliente cliente, Endereco endereco, FormaDePagamento formaDePagamento, StatusDeEntrega statusDeEntrega, TipoDeFrete tipoDeFrete, double valorTotal, List<ProdutoQuantidadeDTO> produtos) {
        this.cliente = cliente;
        this.endereco = endereco;
        this.formaDePagamento = formaDePagamento;
        this.statusDeEntrega = statusDeEntrega;
        this.data = new Date();
        this.tipoDeFrete = tipoDeFrete;
        this.valorTotal = valorTotal;
        this.itensPedido = produtos.stream().map(produtoQuantidadeDTO -> new ItemPedido(
                this, produtoQuantidadeDTO.produto(), produtoQuantidadeDTO.unidades())).toList();

    }


}
