create table usuarios(
	id VARCHAR(36) PRIMARY KEY,
    nome varchar(100) not null,
    cpf varchar(11) not null,
    email varchar(256) unique not null,
    senha varchar(60) not null,
	grupo enum('USUARIO', 'ADMINISTRADOR', 'ESTOQUISTA') not null,
	ativo boolean not null
);

INSERT INTO usuarios (id, nome, cpf, email, senha, grupo, ativo)
VALUES ('b6e10f9c-afe4-42f6-a7a3-46a7d3e503a5',
'super administrador poderosoa', '12345678901',
'adm@example.com',
'$2b$12$dA3nvJX34vmY7KVISyqD7.L0XI7kNMc2S8vtWZEWAe0S1/NN3Cp3W',
'ADMINISTRADOR', true);