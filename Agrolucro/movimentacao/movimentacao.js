// Seleciona o formulario do HTML
let formulario = document.getElementById("formulario");

// Seleciona o local onde aparece a mensagem
let mensagem = document.getElementById("mensagem");

// Busca as movimentacoes salvas no navegador
// Se nao existir nenhuma, cria uma lista vazia
let movimentacoes = JSON.parse(
    localStorage.getItem("movimentacoes")
) || [];

// Detecta quando o usuario clica em salvar
formulario.addEventListener("submit", function(evento) {

    // Impede que a pagina recarregue
    evento.preventDefault();

    // Pega a descricao digitada
    let descricao = document.getElementById("descricao").value;

    // Pega o tipo: Receita ou Despesa
    let tipo = document.getElementById("tipo").value;

    // Pega o valor e transforma em numero
    let valor = Number(
        document.getElementById("valor").value
    );

    // Pega a data escolhida
    let data = document.getElementById("data").value;

    // Verifica se o valor e maior que zero
    if (valor <= 0 || !Number.isFinite(valor)) {
        alert("Digite um valor maior que zero.");
        return;
    }

    // Cria um objeto com os dados da movimentacao
    let movimentacao = {
        descricao: descricao,
        tipo: tipo,
        valor: valor,
        data: data
    };

    // Adiciona a nova movimentacao na lista
    movimentacoes.push(movimentacao);

    // Salva a lista no navegador
    localStorage.setItem(
        "movimentacoes",
        JSON.stringify(movimentacoes)
    );

    // Mostra a mensagem de confirmacao
    mensagem.textContent = "Movimentação salva com sucesso!";

    // Limpa os campos do formulario
    formulario.reset();

});
