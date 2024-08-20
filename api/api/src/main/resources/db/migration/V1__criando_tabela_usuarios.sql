create table usuarios(
	id bigint auto_increment primary key,
    nome varchar(100) not null,
    cpf varchar(11) unique not null,
    email varchar(256) unique not null,
	grupo enum('USUARIO', 'ADMINISTRADOR', 'ESTOQUISTA') not null,
	ativo boolean not null
);