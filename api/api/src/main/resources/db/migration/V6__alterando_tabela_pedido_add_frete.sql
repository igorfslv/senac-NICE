ALTER TABLE pedidos
ADD COLUMN tipo_de_frete enum('CORREIOS', 'SEDEX', 'EXPRESSO_ESPECIAL') not null;



