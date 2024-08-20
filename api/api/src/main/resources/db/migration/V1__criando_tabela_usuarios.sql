create table grupos(
	id bigint primary key,
	nome varchar(30)

);
create table usuarios(
	id bigint primary key,
    nome varchar(100),
    cpf varchar(11) unique,
    email varchar(256) unique,
	grupo_id bigint,
	ativo boolean,
    foreign key (grupo_id) references grupos(id)
);