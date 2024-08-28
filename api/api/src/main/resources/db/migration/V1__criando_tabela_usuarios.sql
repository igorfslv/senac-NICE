create table usuarios(
	id VARCHAR(36) PRIMARY KEY,
    nome varchar(100) not null,
    cpf varchar(11) unique not null,
    email varchar(256) unique not null,
    senha varchar(60) not null,
	grupo enum('USUARIO', 'ADMINISTRADOR', 'ESTOQUISTA') not null,
	ativo boolean not null
);