package pi.nice.api.domain.produto;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import pi.nice.api.domain.imagens.Imagens;
import pi.nice.api.domain.produto.dto.AlterarProdutoDTO;
import pi.nice.api.domain.produto.dto.RegistrarProdutoDTO;

@Table(name= "produtos")
@Entity(name= "Produto")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Size(max=36)
    private String id;

    @NotBlank
    @Size(max=200, message = "O nome do produto deve conter no máximo 200 caracteres.")
    private String nome;

    @NotNull
    private Double preco;

    @NotNull
    private Integer qtd_estoque;

    @Size(max =2000, message = "A descrição deve conter no máximo 2000 caracteres.")
    private String descricao;

    @NotNull
    private Double avaliacao;

    @NotNull
    private boolean ativo;

    public Produto(RegistrarProdutoDTO produtoDTO){
        this.nome = produtoDTO.nome();
        this.preco = produtoDTO.preco();
        this.qtd_estoque = produtoDTO.qtd_estoque();
        this.descricao = produtoDTO.descricao();
        this.avaliacao = produtoDTO.avaliacao();
        this.ativo = true;
    }

    public Produto(AlterarProdutoDTO alterarProdutoDTO){
        this.id = alterarProdutoDTO.id();
        this.nome = alterarProdutoDTO.nome();
        this.preco = alterarProdutoDTO.preco();
        this.qtd_estoque = alterarProdutoDTO.qtd_estoque();
        this.descricao = alterarProdutoDTO.descricao();
        this.avaliacao = alterarProdutoDTO.avaliacao();
        this.ativo = alterarProdutoDTO.ativo();
    }

    public Produto alterarDados(AlterarProdutoDTO alterarProdutoDTO){
        this.nome = alterarProdutoDTO.nome();
        this.preco = alterarProdutoDTO.preco();
        this.qtd_estoque = alterarProdutoDTO.qtd_estoque();
        this.descricao = alterarProdutoDTO.descricao();
        this.avaliacao = alterarProdutoDTO.avaliacao();
        this.ativo = alterarProdutoDTO.ativo();
        return this;
    }

}
