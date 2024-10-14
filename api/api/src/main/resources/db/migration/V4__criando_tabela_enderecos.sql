CREATE TABLE enderecos(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_cliente VARCHAR(36),
    cep VARCHAR(9) NOT NULL,
    logradouro VARCHAR(100) NOT NULL,
    complemento VARCHAR(200) NOT NULL,
    cidade VARCHAR(16),
    numero INT NOT NULL,
    bairro VARCHAR(30),
    uf VARCHAR(3),
    endereco_padrao BOOLEAN NOT NULL,
    CONSTRAINT fk_id_cliente FOREIGN KEY (id_cliente) REFERENCES clientes(id)
);
