package pi.nice.api.domain.pedido.itempedido;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pi.nice.api.domain.pedido.Pedido;
import pi.nice.api.domain.produto.Produto;

@Entity(name = "itemPedido")
@Table(name = "item_pedido")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemPedido {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_pedido")
    private Pedido pedido;
    @ManyToOne
    @JoinColumn(name = "id_produto")
    private Produto produto;
    private double precoUnitario;
    private int unidades;

    public ItemPedido(Pedido pedido, Produto produto, int unidades) {
        this.pedido = pedido;
        this.produto = produto;
        this.precoUnitario = produto.getPreco();
        this.unidades = unidades;
    }
}
