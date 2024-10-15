CREATE TABLE clientes (
    id VARCHAR(36) PRIMARY KEY,
    id_endereco_de_faturamento BIGINT UNIQUE,
    data_de_nascimento DATE,
    genero ENUM('FEMININO', 'MASCULINO', 'GÊNERO_EM_DÚVIDA'),
    FOREIGN KEY (id) REFERENCES usuarios(id) ON DELETE CASCADE
);
