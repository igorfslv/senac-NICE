function copiarEnderecoFaturamentoParaEntrega() {
    // Seleciona os campos de endereço de faturamento
    const logradouroFaturamento = document.getElementById('logradouro-cliente-faturamento').value;
    const numeroFaturamento = document.getElementById('numero-cliente-faturamento').value;
    const complementoFaturamento = document.getElementById('complemento-cliente-faturamento').value;
    const bairroFaturamento = document.getElementById('bairro-cliente-faturamento').value;
    const cidadeFaturamento = document.getElementById('cidade-cliente-faturamento').value;
    const ufFaturamento = document.getElementById('uf-cliente-faturamento').value;
    const cepFaturamento = document.getElementById('cep-cliente-faturamento').value;

    // Define os valores nos campos de endereço de entrega
    document.getElementById('logradouro-cliente-entrega').value = logradouroFaturamento;
    document.getElementById('numero-cliente-entrega').value = numeroFaturamento;
    document.getElementById('complemento-cliente-entrega').value = complementoFaturamento;
    document.getElementById('bairro-cliente-entrega').value = bairroFaturamento;
    document.getElementById('cidade-cliente-entrega').value = cidadeFaturamento;
    document.getElementById('uf-cliente-entrega').value = ufFaturamento;
    document.getElementById('cep-cliente-entrega').value = cepFaturamento;
}

document.querySelector('.btn-copiar-endereco').addEventListener('click', function (event) {
    event.preventDefault(); // Previne que o botão envie um formulário ou cause outro comportamento padrão
    copiarEnderecoFaturamentoParaEntrega();
});
