// ============================================
// CALCULADORA DE FINANCIAMENTO IMOBILIÁRIO
// Lógica completa em JavaScript
// ============================================

// ============================================
// FUNÇÕES PRINCIPAIS (exportadas para testes)
// ============================================

/**
 * Calcula a primeira parcela no sistema SAC
 * @param {number} valorFinanciado - Valor total financiado (imóvel - entrada)
 * @param {number} taxaMensal - Taxa de juros mensal (ex: 0.008 para 0.8%)
 * @param {number} prazoMeses - Prazo em meses
 * @returns {number} Valor da primeira parcela
 */
function calcularPrimeiraParcelaSAC(valorFinanciado, taxaMensal, prazoMeses) {
    const amortizacao = valorFinanciado / prazoMeses;
    const primeiraParcela = amortizacao + (valorFinanciado * taxaMensal);
    return primeiraParcela;
}

/**
 * Calcula a amortização constante no sistema SAC
 * @param {number} valorFinanciado - Valor total financiado
 * @param {number} prazoMeses - Prazo em meses
 * @returns {number} Valor da amortização constante
 */
function calcularAmortizacaoConstante(valorFinanciado, prazoMeses) {
    return valorFinanciado / prazoMeses;
}

/**
 * Calcula a parcela fixa no sistema Price
 * @param {number} valorFinanciado - Valor total financiado
 * @param {number} taxaMensal - Taxa de juros mensal
 * @param {number} prazoMeses - Prazo em meses
 * @returns {number} Valor da parcela fixa
 */
function calcularParcelaPrice(valorFinanciado, taxaMensal, prazoMeses) {
    const coef = (taxaMensal * Math.pow(1 + taxaMensal, prazoMeses)) / 
                 (Math.pow(1 + taxaMensal, prazoMeses) - 1);
    const parcelaFixa = valorFinanciado * coef;
    return parcelaFixa;
}

/**
 * Calcula o percentual da renda comprometido pela parcela
 * @param {number} parcela - Valor da parcela
 * @param {number} rendaFamiliar - Renda familiar mensal
 * @returns {number} Percentual da renda comprometido
 */
function calcularPercentualRenda(parcela, rendaFamiliar) {
    if (rendaFamiliar <= 0) return 0;
    return (parcela / rendaFamiliar) * 100;
}

/**
 * Retorna um alerta com base no percentual da renda comprometido
 * @param {number} percentual - Percentual da renda comprometido
 * @returns {string} Mensagem de alerta com emoji
 */
function gerarAlertaOrcamento(percentual) {
    if (percentual <= 30) {
        return "✅ Dentro do recomendado. Parcela saudável.";
    } else if (percentual <= 40) {
        return `⚠️ Atenção: parcela compromete ${percentual.toFixed(1)}% da renda. Limite ideal é 30%.`;
    } else {
        return `🔴 Risco financeiro: parcela compromete ${percentual.toFixed(1)}% da renda. Considere aumentar entrada ou prazo.`;
    }
}

/**
 * Calcula o total pago e total de juros no sistema SAC
 * @param {number} valorFinanciado - Valor total financiado
 * @param {number} taxaMensal - Taxa de juros mensal
 * @param {number} prazoMeses - Prazo em meses
 * @returns {object} { totalPago, totalJuros }
 */
function calcularTotaisSAC(valorFinanciado, taxaMensal, prazoMeses) {
    const amortizacao = valorFinanciado / prazoMeses;
    const primeiraParcela = amortizacao + (valorFinanciado * taxaMensal);
    const ultimaParcela = amortizacao + (amortizacao * taxaMensal);
    const mediaParcela = (primeiraParcela + ultimaParcela) / 2;
    const totalPago = mediaParcela * prazoMeses;
    const totalJuros = totalPago - valorFinanciado;
    return { totalPago, totalJuros };
}

/**
 * Calcula o total pago e total de juros no sistema Price
 * @param {number} valorFinanciado - Valor total financiado
 * @param {number} taxaMensal - Taxa de juros mensal
 * @param {number} prazoMeses - Prazo em meses
 * @returns {object} { totalPago, totalJuros, parcelaFixa }
 */
function calcularTotaisPrice(valorFinanciado, taxaMensal, prazoMeses) {
    const parcelaFixa = calcularParcelaPrice(valorFinanciado, taxaMensal, prazoMeses);
    const totalPago = parcelaFixa * prazoMeses;
    const totalJuros = totalPago - valorFinanciado;
    return { totalPago, totalJuros, parcelaFixa };
}

/**
 * Gera a tabela HTML das primeiras parcelas
 * @param {string} tipo - 'SAC' ou 'Price'
 * @param {number} valorFinanciado - Valor total financiado
 * @param {number} taxaMensal - Taxa de juros mensal
 * @param {number} prazoMeses - Prazo em meses
 * @param {number} primeiraParcela - Valor da primeira parcela (já calculado)
 * @returns {string} HTML da tabela
 */
function gerarTabelaParcelas(tipo, valorFinanciado, taxaMensal, prazoMeses, primeiraParcela) {
    let saldoDevedor = valorFinanciado;
    let html = '<table><thead><tr>';
    html += '<th>Parcela</th><th>Valor (R$)</th><th>Amortização (R$)</th><th>Juros (R$)</th><th>Saldo Devedor (R$)</th>';
    html += '</tr></thead><tbody>';
    
    const parcelasParaMostrar = Math.min(12, prazoMeses);
    const amortizacaoConstante = tipo === 'SAC' ? valorFinanciado / prazoMeses : null;
    
    for (let i = 1; i <= parcelasParaMostrar; i++) {
        let parcela, juros, amortizacao;
        
        if (tipo === 'SAC') {
            amortizacao = amortizacaoConstante;
            juros = saldoDevedor * taxaMensal;
            parcela = amortizacao + juros;
        } else {
            parcela = primeiraParcela;
            juros = saldoDevedor * taxaMensal;
            amortizacao = parcela - juros;
            if (amortizacao < 0) amortizacao = 0;
        }
        
        saldoDevedor -= amortizacao;
        if (saldoDevedor < 0) saldoDevedor = 0;
        
        html += `<tr>
            <td>${i}</td>
            <td>R$ ${parcela.toFixed(2)}</td>
            <td>R$ ${amortizacao.toFixed(2)}</td>
            <td>R$ ${juros.toFixed(2)}</td>
            <td>R$ ${saldoDevedor.toFixed(2)}</td>
        </tr>`;
    }
    
    if (prazoMeses > 12) {
        html += `<tr><td colspan="5" style="text-align: center;">... e mais ${prazoMeses - 12} parcelas</td></tr>`;
    }
    
    html += '</tbody></table>';
    return html;
}

// ============================================
// FUNÇÃO PRINCIPAL (chamada pelo HTML)
// ============================================

/**
 * Função principal que calcula e exibe os resultados na página
 */
function calcularFinanciamento() {
    // Pegar valores do formulário
    const valorImovel = parseFloat(document.getElementById('valorImovel').value);
    const entrada = parseFloat(document.getElementById('entrada').value);
    const taxaJurosAnual = parseFloat(document.getElementById('taxaJuros').value);
    const prazoAnos = parseInt(document.getElementById('prazoAnos').value);
    const rendaFamiliar = parseFloat(document.getElementById('rendaFamiliar').value);
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    // Validações
    if (entrada >= valorImovel) {
        alert('A entrada não pode ser maior ou igual ao valor do imóvel!');
        return;
    }
    
    if (rendaFamiliar <= 0) {
        alert('A renda familiar deve ser maior que zero!');
        return;
    }
    
    if (valorImovel <= 0 || entrada < 0 || taxaJurosAnual < 0 || prazoAnos <= 0) {
        alert('Por favor, preencha todos os campos com valores válidos!');
        return;
    }
    
    // Cálculos básicos
    const valorFinanciado = valorImovel - entrada;
    const taxaMensal = (taxaJurosAnual / 100) / 12;
    const prazoMeses = prazoAnos * 12;
    
    let primeiraParcela;
    let totalPago, totalJuros;
    
    // Calcular com base no tipo
    if (tipo === 'SAC') {
        primeiraParcela = calcularPrimeiraParcelaSAC(valorFinanciado, taxaMensal, prazoMeses);
        const totais = calcularTotaisSAC(valorFinanciado, taxaMensal, prazoMeses);
        totalPago = totais.totalPago;
        totalJuros = totais.totalJuros;
    } else {
        primeiraParcela = calcularParcelaPrice(valorFinanciado, taxaMensal, prazoMeses);
        const totais = calcularTotaisPrice(valorFinanciado, taxaMensal, prazoMeses);
        totalPago = totais.totalPago;
        totalJuros = totais.totalJuros;
    }
    
    // Calcular percentual da renda
    const percentualRenda = calcularPercentualRenda(primeiraParcela, rendaFamiliar);
    const alertaMensagem = gerarAlertaOrcamento(percentualRenda);
    
    // Determinar classe do alerta
    let alertaClasse = '';
    if (percentualRenda <= 30) {
        alertaClasse = 'alerta-verde';
    } else if (percentualRenda <= 40) {
        alertaClasse = 'alerta-amarelo';
    } else {
        alertaClasse = 'alerta-vermelho';
    }
    
    // Gerar tabela de parcelas
    const tabelaHtml = gerarTabelaParcelas(tipo, valorFinanciado, taxaMensal, prazoMeses, primeiraParcela);
    
    // Montar resultado HTML
    const resultadoHtml = `
        <h2>📊 Resultado da Simulação</h2>
        
        <div class="resultado-item">
            <strong>Sistema:</strong> ${tipo}
        </div>
        
        <div class="resultado-item">
            <strong>Valor financiado:</strong> R$ ${valorFinanciado.toFixed(2)}
        </div>
        
        <div class="resultado-item">
            <strong>Valor da primeira parcela:</strong> R$ ${primeiraParcela.toFixed(2)}
        </div>
        
        ${tipo === 'SAC' ? `<div class="resultado-item"><strong>Amortização constante:</strong> R$ ${(valorFinanciado / prazoMeses).toFixed(2)}</div>` : ''}
        
        <div class="resultado-item">
            <strong>Total pago no fim:</strong> R$ ${totalPago.toFixed(2)}
        </div>
        
        <div class="resultado-item">
            <strong>Total de juros pagos:</strong> R$ ${totalJuros.toFixed(2)}
        </div>
        
        <div class="resultado-item ${alertaClasse}">
            <strong>Comprometimento da renda:</strong> ${percentualRenda.toFixed(1)}%<br>
            ${alertaMensagem}
        </div>
        
        <h3>📋 Primeiras parcelas (detalhadas)</h3>
        <div class="tabela-parcelas">
            ${tabelaHtml}
        </div>
        <div class="aviso">* Valores aproximados. Consulte um especialista para decisões financeiras reais.</div>
    `;
    
    // Exibir resultado
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = resultadoHtml;
    resultadoDiv.classList.add('show');
    
    // ============================================
    // ATUALIZAR CARDS DA SEÇÃO "DADOS" (NOVO!)
    // ============================================
    const percentualJuros = (totalJuros / valorImovel) * 100;
    
    // Atualizar os cards apenas se os elementos existirem
    if (document.getElementById('dataJuros')) {
        document.getElementById('dataJuros').innerHTML = `${percentualJuros.toFixed(0)}%`;
    }
    if (document.getElementById('dataComprometimento')) {
        document.getElementById('dataComprometimento').innerHTML = `${percentualRenda.toFixed(0)}%`;
    }
    if (document.getElementById('dataPrazo')) {
        document.getElementById('dataPrazo').innerHTML = `${prazoAnos} anos`;
    }
    if (document.getElementById('dataTotal')) {
        document.getElementById('dataTotal').innerHTML = `R$ ${(totalPago / 1000).toFixed(0)}k`;
    }
}

// ============================================
// EXPORTAÇÃO PARA TESTES (navegador)
// ============================================

// Tornar funções acessíveis globalmente para os testes
if (typeof window !== 'undefined') {
    window.calcularPrimeiraParcelaSAC = calcularPrimeiraParcelaSAC;
    window.calcularParcelaPrice = calcularParcelaPrice;
    window.calcularPercentualRenda = calcularPercentualRenda;
    window.gerarAlertaOrcamento = gerarAlertaOrcamento;
    window.calcularAmortizacaoConstante = calcularAmortizacaoConstante;
    window.calcularTotaisSAC = calcularTotaisSAC;
    window.calcularTotaisPrice = calcularTotaisPrice;
    window.gerarTabelaParcelas = gerarTabelaParcelas;
    window.calcularFinanciamento = calcularFinanciamento;
}

// ============================================
// CONSUMO DA API DO BANCO CENTRAL (TAXA SELIC)
// ============================================

/**
 * Busca a Taxa Selic atual na API do Banco Central
 * @returns {Promise<{valor: number, data: string, valorFormatado: string}|{erro: boolean, mensagem: string}>}
 */
async function buscarTaxaSelic() {
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados?formato=json&dataInicial=01/01/${anoAtual}&dataFinal=31/12/${anoAtual}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const dados = await response.json();
        
        if (!dados || dados.length === 0) {
            throw new Error('Nenhum dado retornado pela API');
        }
        
        const ultimaTaxa = dados[dados.length - 1];
        const valorSelic = parseFloat(ultimaTaxa.valor);
        const dataSelic = ultimaTaxa.data;
        
        // Formatar data (DD/MM/YYYY)
        const dataFormatada = dataSelic.split('/').reverse().join('/');
        
        return {
            valor: valorSelic,
            data: dataFormatada,
            valorFormatado: valorSelic.toFixed(2).replace('.', ',')
        };
    } catch (erro) {
        console.error('Erro ao buscar Taxa Selic:', erro);
        return {
            erro: true,
            mensagem: 'Não foi possível carregar a Taxa Selic no momento.'
        };
    }
}

/**
 * Exibe a Taxa Selic na interface
 */
async function exibirTaxaSelic() {
    const container = document.getElementById('taxaSelicContainer');
    
    if (!container) return;
    
    container.innerHTML = '<div class="selic-loading">🔄 Carregando Taxa Selic...</div>';
    
    const resultado = await buscarTaxaSelic();
    
    if (resultado.erro) {
        container.innerHTML = `<div class="selic-erro">⚠️ ${resultado.mensagem}</div>`;
        return;
    }
    
    container.innerHTML = `
        <div class="selic-card">
            <div class="selic-titulo">🏦 Taxa Selic (BCB)</div>
            <div class="selic-valor">${resultado.valorFormatado}%</div>
            <div class="selic-data">Atualizado em: ${resultado.data}</div>
            <div class="selic-info">A Selic influencia diretamente as taxas de juros dos financiamentos imobiliários.</div>
        </div>
    `;
}

// Carregar a Taxa Selic quando a página carregar
document.addEventListener('DOMContentLoaded', exibirTaxaSelic);