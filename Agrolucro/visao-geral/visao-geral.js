// Busca os produtores cadastrados no navegador
// Se nao existir nenhum, cria uma lista vazia
let produtores = JSON.parse(
    localStorage.getItem("produtores")
) || [];

// Busca as movimentacoes cadastradas
// Se nao existir nenhuma, cria uma lista vazia
let movimentacoes = JSON.parse(
    localStorage.getItem("movimentacoes")
) || [];

// Conta a quantidade de produtores
let totalProdutores = produtores.length;

// Conta a quantidade de movimentacoes
let totalMovimentacoes = movimentacoes.length;

// Mostra as quantidades na pagina
document.getElementById("totalProdutores").textContent =
    totalProdutores;

document.getElementById("totalMovimentacoes").textContent =
    totalMovimentacoes;

// Valores iniciais
let receitas = 0;
let despesas = 0;

// Percorre as movimentacoes cadastradas
for (let i = 0; i < movimentacoes.length; i++) {

    // Pega uma movimentacao da lista
    let item = movimentacoes[i];

    // Verifica o tipo e soma o valor
    if (item.tipo === "Receita") {
        receitas += item.valor;
    } else if (item.tipo === "Despesa") {
        despesas += item.valor;
    }
}

// Calcula o saldo
let saldo = receitas - despesas;

// Funcao para formatar valores em reais
function formatarDinheiro(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Mostra os valores financeiros
document.getElementById("receitas").textContent =
    formatarDinheiro(receitas);

document.getElementById("despesas").textContent =
    formatarDinheiro(despesas);

document.getElementById("saldo").textContent =
    formatarDinheiro(saldo);

// Seleciona a mensagem da situacao financeira
let situacao = document.getElementById("situacao");

// Verifica se o saldo e positivo, negativo ou zero
if (saldo > 0) {

    situacao.textContent =
        "Saldo positivo! As receitas são maiores que as despesas.";

    situacao.style.color = "green";

} else if (saldo < 0) {

    situacao.textContent =
        "Saldo negativo! As despesas são maiores que as receitas.";

    situacao.style.color = "red";

} else {

    situacao.textContent =
        "Saldo zerado! As receitas e despesas estão equilibradas.";

    situacao.style.color = "#555555";
}
