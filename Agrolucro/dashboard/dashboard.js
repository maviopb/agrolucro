// Busca as movimentacoes salvas
let movimentacoes = JSON.parse(
    localStorage.getItem("movimentacoes")
) || [];

// Valores iniciais
let receitas = 0;
let despesas = 0;

// Percorre as movimentacoes
for (let i = 0; i < movimentacoes.length; i++) {

    let item = movimentacoes[i];

    // Soma receitas e despesas
    if (item.tipo === "Receita") {
        receitas += item.valor;
    } else if (item.tipo === "Despesa") {
        despesas += item.valor;
    }
}

// Calcula o saldo
let saldo = receitas - despesas;

// Formata os valores em reais
function formatarDinheiro(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Mostra os valores no Dashboard
document.getElementById("receitas").textContent =
    formatarDinheiro(receitas);

document.getElementById("despesas").textContent =
    formatarDinheiro(despesas);

document.getElementById("saldo").textContent =
    formatarDinheiro(saldo);

// Seleciona a tabela
let tabela = document.getElementById("ultimasMovimentacoes");

// Pega as ultimas cinco movimentacoes
let ultimas = movimentacoes.slice(-5).reverse();

// Verifica se existem movimentacoes
if (ultimas.length > 0) {

    document.getElementById("mensagem").textContent = "";

    // Adiciona cada movimentacao na tabela
    for (let i = 0; i < ultimas.length; i++) {

        let item = ultimas[i];

        let linha = document.createElement("tr");

        // Organiza os dados
        let dados = [
            item.data.split("-").reverse().join("/"),
            item.descricao,
            item.tipo,
            formatarDinheiro(item.valor)
        ];

        // Cria as colunas
        for (let j = 0; j < dados.length; j++) {

            let coluna = document.createElement("td");

            coluna.textContent = dados[j];

            linha.appendChild(coluna);
        }

        // Adiciona a linha na tabela
        tabela.appendChild(linha);
    }
}

// =====================================
// INTEGRACAO COM AS CONFIGURACOES
// =====================================

// Busca as configuracoes salvas
let configuracoesDashboard = JSON.parse(
    localStorage.getItem("configuracoes")
) || {};

// Seleciona os elementos do HTML
let nomePropriedade = document.getElementById("nomePropriedade");

let nomeResponsavel = document.getElementById("nomeResponsavel");

let mensagemBoasVindas = document.getElementById("mensagemBoasVindas");

// Verifica se existe uma propriedade cadastrada
if (configuracoesDashboard.propriedade) {

    // Mostra o nome da propriedade
    nomePropriedade.textContent =
        configuracoesDashboard.propriedade;

} else {

    // Mostra um nome padrao
    nomePropriedade.textContent = "Minha Propriedade";
}

// Verifica se existe um responsavel cadastrado
if (configuracoesDashboard.responsavel) {

    nomeResponsavel.textContent =
        "Responsável: " + configuracoesDashboard.responsavel;

} else {

    nomeResponsavel.textContent = "";
}

// Verifica se a mensagem de boas-vindas esta ativada
if (configuracoesDashboard.boasVindas === true) {

    mensagemBoasVindas.textContent =
        "Bem-vindo ao AgroLucro!";

} else {

    // Nao mostra mensagem se estiver desativada
    mensagemBoasVindas.textContent = "";
}
