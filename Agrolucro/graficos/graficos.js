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

<<<<<<< HEAD
    // Soma os valores conforme o tipo
    if (item.tipo === "Receita") {
        receitas += item.valor;
    } else if (item.tipo === "Despesa") {
        despesas += item.valor;
=======
    // Garante que o valor e um numero e ignora maiuscula/minuscula no tipo
    let valor = Number(item.valor);
    let tipo = String(item.tipo).trim().toLowerCase();

    // Soma os valores conforme o tipo
    if (tipo === "receita") {
        receitas += valor;
    } else if (tipo === "despesa") {
        despesas += valor;
>>>>>>> ddad8e8 (Atualiza AgroLucro 2.0 com planejamento rural)
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

<<<<<<< HEAD
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
=======
// Elementos do grafico
const barraDespesas = document.getElementById("barraDespesas");
const barraSaldo = document.getElementById("barraSaldo");
const percDespesas = document.getElementById("percDespesas");
const percSaldo = document.getElementById("percSaldo");
const mensagem = document.getElementById("mensagemGrafico");

// Evita divisao por zero
if (receitas > 0) {

    // Quanto das receitas foi gasto
    let porcentagemDespesas = (despesas / receitas) * 100;

    // Quanto sobrou (nunca abaixo de 0)
    let porcentagemSaldo = Math.max(100 - porcentagemDespesas, 0);

    // Largura das barras (despesas limitada a 100%)
    barraDespesas.style.width = Math.min(porcentagemDespesas, 100) + "%";
    barraSaldo.style.width = porcentagemSaldo + "%";

    // Textos com a porcentagem
    percDespesas.textContent = porcentagemDespesas.toFixed(1) + "%";
    percSaldo.textContent = porcentagemSaldo.toFixed(1) + "%";

    // Mensagem conforme a situacao
    if (porcentagemDespesas > 100) {
        mensagem.textContent =
            "Atenção: as despesas ultrapassaram as receitas.";
    } else {
        mensagem.textContent =
            "Você gastou " + porcentagemDespesas.toFixed(1) +
            "% das receitas e sobraram " + porcentagemSaldo.toFixed(1) + "%.";
    }

} else if (despesas > 0) {
    // Tem despesa, mas nenhuma receita
    percDespesas.textContent = "—";
    percSaldo.textContent = "0%";
    mensagem.textContent =
        "Não há receitas cadastradas para comparar com as despesas.";
>>>>>>> ddad8e8 (Atualiza AgroLucro 2.0 com planejamento rural)
}