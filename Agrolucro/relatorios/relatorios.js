<<<<<<< HEAD
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
=======

// Recupera as movimentacoes cadastradas nas outras paginas.
let movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];

// Seleciona os elementos da pagina.
let tabela = document.getElementById("tabelaRelatorio");
let mensagem = document.getElementById("mensagem");
let dataInicio = document.getElementById("dataInicio");
let dataFim = document.getElementById("dataFim");
let erroFiltro = document.getElementById("erroFiltro");

// Formata um numero para a moeda brasileira.
function formatarDinheiro(valor) {
    return Number(valor).toLocaleString("pt-BR", {
>>>>>>> ddad8e8 (Atualiza AgroLucro 2.0 com planejamento rural)
        style: "currency",
        currency: "BRL"
    });
}

<<<<<<< HEAD
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
=======
// Converte a data do formato AAAA-MM-DD para DD/MM/AAAA.
function formatarData(data) {
    return data ? data.split("-").reverse().join("/") : "Sem data";
}

// Atualiza a tabela e os totais com as movimentacoes selecionadas.
function mostrarRelatorio(lista) {
    let receitas = 0;
    let despesas = 0;

    // Apaga as linhas antigas para nao duplicar resultados.
    tabela.innerHTML = "";

    for (let i = 0; i < lista.length; i++) {
        let item = lista[i];
        let valor = Number(item.valor) || 0;

        if (item.tipo === "Receita") {
            receitas += valor;
        } else if (item.tipo === "Despesa") {
            despesas += valor;
        }

        // Cria uma linha com os dados da movimentacao.
        let linha = document.createElement("tr");
        let dados = [
            formatarData(item.data),
            item.descricao,
            item.tipo,
            formatarDinheiro(valor)
        ];

        for (let j = 0; j < dados.length; j++) {
            let coluna = document.createElement("td");
            coluna.textContent = dados[j];
            linha.appendChild(coluna);
        }
        tabela.appendChild(linha);
    }

    // Exibe o resultado apenas do periodo selecionado.
    document.getElementById("receitas").textContent = formatarDinheiro(receitas);
    document.getElementById("despesas").textContent = formatarDinheiro(despesas);
    document.getElementById("saldo").textContent = formatarDinheiro(receitas - despesas);
    document.getElementById("quantidade").textContent = lista.length;

    mensagem.textContent = lista.length === 0
        ? "Nenhuma movimentação encontrada para este período."
        : "";
}

// Filtra os registros usando a data inicial e final informadas.
function filtrarRelatorio() {
    let inicio = dataInicio.value;
    let fim = dataFim.value;

    // Impede uma data final anterior a data inicial.
    if (inicio && fim && inicio > fim) {
        erroFiltro.textContent = "A data final não pode ser anterior à inicial.";
        return;
    }
    erroFiltro.textContent = "";

    let resultado = movimentacoes.filter(function(item) {
        // Datas no formato AAAA-MM-DD podem ser comparadas como texto.
        if (!item.data) return !inicio && !fim;
        return (!inicio || item.data >= inicio) && (!fim || item.data <= fim);
    });

    let periodo = "Período: ";
    if (!inicio && !fim) {
        periodo += "todas as datas";
    } else {
        periodo += (inicio ? formatarData(inicio) : "início") +
            " até " + (fim ? formatarData(fim) : "sem limite");
    }
    document.getElementById("periodoRelatorio").textContent = periodo;
    mostrarRelatorio(resultado);
}

// Liga os botoes as suas funcionalidades.
document.getElementById("filtrar").addEventListener("click", filtrarRelatorio);
document.getElementById("limpar").addEventListener("click", function() {
    dataInicio.value = "";
    dataFim.value = "";
    filtrarRelatorio();
});

// Abre a impressao do navegador com os dados atualmente exibidos.
function imprimirRelatorio() {
    window.print();
}

// Mostra todas as movimentacoes quando a pagina abre.
filtrarRelatorio();
>>>>>>> ddad8e8 (Atualiza AgroLucro 2.0 com planejamento rural)
