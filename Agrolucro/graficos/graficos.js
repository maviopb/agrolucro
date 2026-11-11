// Busca as movimentacoes salvas
let movimentacoes = JSON.parse(
    localStorage.getItem("movimentacoes")
) || [];

// Valores iniciais
let receitas = 0;
let despesas = 0;

// Percorre todas as movimentacoes
for (let i = 0; i < movimentacoes.length; i++) {

    let item = movimentacoes[i];

    // Soma os valores conforme o tipo
    if (item.tipo === "Receita") {
        receitas += item.valor;
    } else if (item.tipo === "Despesa") {
        despesas += item.valor;
    }
}

// Calcula o saldo
let saldo = receitas - despesas;

// Funcao para formatar dinheiro
function formatarDinheiro(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Mostra os valores na pagina
document.getElementById("receitas").textContent =
    formatarDinheiro(receitas);

document.getElementById("despesas").textContent =
    formatarDinheiro(despesas);

document.getElementById("saldo").textContent =
    formatarDinheiro(saldo);

// Descobre qual e o maior valor
let maiorValor = Math.max(receitas, despesas);

// Evita divisao por zero
if (maiorValor > 0) {

    // Calcula a porcentagem das barras
    let porcentagemReceitas = (receitas / maiorValor) * 100;
    let porcentagemDespesas = (despesas / maiorValor) * 100;

    // Define a largura das barras
    document.getElementById("barraReceitas").style.width =
        porcentagemReceitas + "%";

    document.getElementById("barraDespesas").style.width =
        porcentagemDespesas + "%";
}