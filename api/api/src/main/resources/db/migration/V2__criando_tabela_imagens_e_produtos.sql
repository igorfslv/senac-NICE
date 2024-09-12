CREATE TABLE produtos(
    id VARCHAR(36) PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    qtd_estoque INT NOT NULL,
    descricao VARCHAR(2000),
    avaliacao DECIMAL(2,1),
    ativo BOOLEAN NOT NULL
);

INSERT INTO produtos(id, nome, preco, qtd_estoque, descricao, avaliacao, ativo)
VALUES('cd4f30ab-5ee1-477f-99c0-1998303cc474',
       'TV 50 Polegadas',
        2000.00,
        10,
        'Uma linda TV de 50 polegadas',
        4.5,
        true
);

CREATE TABLE imagens(
    id VARCHAR(36) PRIMARY KEY,
    id_produto VARCHAR(36) NOT NULL,
    nome VARCHAR(200) NOT NULL,
    caminho VARCHAR(200) NOT NULL,
    principal BOOLEAN NOT NULL,
    CONSTRAINT fk_id_produto FOREIGN KEY (id_produto) REFERENCES produtos(id)
);



INSERT INTO imagens (id, id_produto, nome, caminho, principal)
VALUES ('9b7e7e50-cdae-4cc8-a141-bfb4d90ee4e6',
        'cd4f30ab-5ee1-477f-99c0-1998303cc474',
        'tv50pol.png',
        'imagens/teste',
        true
);