ALTER TABLE pedidos
ADD COLUMN tipo_de_frete enum('CORREIOS', 'PIX', 'EXPRESSO_ESPECIAL') not null;



