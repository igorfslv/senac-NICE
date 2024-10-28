ALTER TABLE pedidos
MODIFY COLUMN forma_de_pagamento ENUM('PIX', 'CARTAO') NOT NULL;