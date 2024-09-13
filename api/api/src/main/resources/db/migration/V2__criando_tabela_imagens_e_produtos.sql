CREATE TABLE produtos(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    qtd_estoque INT NOT NULL,
    descricao VARCHAR(2000),
    avaliacao DECIMAL(2,1),
    ativo BOOLEAN NOT NULL
);

CREATE TABLE imagens(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_produto BIGINT NOT NULL,
    nome VARCHAR(200) NOT NULL,
    caminho VARCHAR(200) NOT NULL,
    principal BOOLEAN NOT NULL,
    CONSTRAINT fk_id_produto FOREIGN KEY (id_produto) REFERENCES produtos(id)
);


