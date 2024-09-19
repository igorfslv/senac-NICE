package pi.nice.api.domain.produto;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import pi.nice.api.domain.imagens.Imagem;
import pi.nice.api.domain.produto.dto.AlterarProdutoDTO;
import pi.nice.api.domain.produto.dto.RegistrarProdutoDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Table(name= "produtos")
@Entity(name= "Produto")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max=200, message = "O nome do produto deve conter no máximo 200 caracteres.")
    private String nome;

    @NotNull
    private Double preco;

    @NotNull
    private Integer qtd_estoque;

    @Size(max = 2000, message = "A descrição deve conter no máximo 2000 caracteres.")
    private String descricao;

    @NotNull
    @AvaliacaoValida
    private Double avaliacao;

    @NotNull
    private boolean ativo;

    @OneToMany(mappedBy = "produto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Imagem> imagens = new ArrayList<>();


    public Produto(RegistrarProdutoDTO produtoDTO){
        this.nome = produtoDTO.nome();
        this.preco = produtoDTO.preco();
        this.qtd_estoque = produtoDTO.qtdEstoque();
        this.descricao = produtoDTO.descricao();
        this.avaliacao = produtoDTO.avaliacao();
        this.imagens = produtoDTO.imagens()
                .stream()
                .map(registrarImagemDTO -> new Imagem(registrarImagemDTO, this))
                .collect(Collectors.toList());
        this.ativo = true;
    }

    public Produto alterarDados(AlterarProdutoDTO alterarProdutoDTO){
        this.nome = alterarProdutoDTO.nome();
        this.preco = alterarProdutoDTO.preco();
        this.qtd_estoque = alterarProdutoDTO.qtdEstoque();
        this.descricao = alterarProdutoDTO.descricao();
        this.avaliacao = alterarProdutoDTO.avaliacao();
        this.imagens.clear();
        this.imagens.addAll(alterarProdutoDTO.imagens()
                .stream()
                .map(registrarImagemDTO -> new Imagem(registrarImagemDTO, this))
                .collect(Collectors.toList()));
        return this;

    }

    public void desativar() {
        this.ativo = !ativo;
    }


}
