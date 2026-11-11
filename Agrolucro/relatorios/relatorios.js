// Busca as movimentacoes salvas no navegador
// Se nao existir nenhuma, cria uma lista vazia
let movimentacoes = JSON.parse(
    localStorage.getItem("movimentacoes")
) || [];

// Valores iniciais
let receitas = 0;
let despesas = 0;

// Seleciona a tabela do relatorio
let tabela = document.getElementById("tabelaRelatorio");

// Seleciona a mensagem
let mensagem = document.getElementById("mensagem");

// Funcao para formatar valores em reais
function formatarDinheiro(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Percorre todas as movimentacoes
for (let i = 0; i < movimentacoes.length; i++) {

    // Pega uma movimentacao
    let item = movimentacoes[i];

    // Soma as receitas e despesas
    if (item.tipo === "Receita") {
        receitas += item.valor;
    } else if (item.tipo === "Despesa") {
        despesas += item.valor;
    }

    // Cria uma linha da tabela
    let linha = document.createElement("tr");

    // Organiza os dados
    let dados = [
        item.data.split("-").reverse().join("/"),
        item.descricao,
        item.tipo,
        formatarDinheiro(item.valor)
    ];

    // Cria as colunas da tabela
    for (let j = 0; j < dados.length; j++) {

        let coluna = document.createElement("td");

        // Coloca o texto na coluna
        coluna.textContent = dados[j];

        // Adiciona a coluna na linha
        linha.appendChild(coluna);
    }

    // Adiciona a linha na tabela
    tabela.appendChild(linha);
}

// Calcula o saldo final
let saldo = receitas - despesas;

// Mostra os valores na pagina
document.getElementById("receitas").textContent =
    formatarDinheiro(receitas);

document.getElementById("despesas").textContent =
    formatarDinheiro(despesas);

document.getElementById("saldo").textContent =
    formatarDinheiro(saldo);

// Mostra mensagem caso nao existam movimentacoes
if (movimentacoes.length === 0) {

    mensagem.textContent =
        "Nenhuma movimentação cadastrada.";
}

// Funcao para imprimir o relatorio
function imprimirRelatorio() {

    // Abre a janela de impressao do navegador
    window.print();
}
