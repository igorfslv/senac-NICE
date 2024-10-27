CREATE TABLE pedidos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_cliente VARCHAR(36),
    id_endereco BIGINT NOT NULL,
    forma_de_pagamento enum('PIX', 'CARTAO_DE_CREDITO') not null,
    status_de_entrega enum('AGUARDANDO_PAGAMENTO') not null,
    data date not null,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id),
    FOREIGN KEY (id_endereco) REFERENCES enderecos(id)
);

CREATE TABLE item_pedido (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_produto BIGINT NOT NULL,
    id_pedido BIGINT NOT NULL,
    unidades INT NOT NULL,
    preco_unitario DOUBLE not null,
    FOREIGN KEY (id_produto) REFERENCES produtos(id),
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id)


);
