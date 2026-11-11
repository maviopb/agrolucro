// Busca as movimentacoes salvas no navegador
// Se nao existir nenhuma, cria uma lista vazia
let movimentacoes = JSON.parse(
    localStorage.getItem("movimentacoes")
) || [];

// Seleciona a tabela do HTML
let tabela = document.getElementById("tabelaHistorico");

// Seleciona o local da mensagem
let mensagem = document.getElementById("mensagem");

// Funcao para formatar valores em reais
function formatarDinheiro(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Funcao para mostrar as movimentacoes
function mostrarHistorico() {

    // Limpa a tabela antes de atualizar
    tabela.innerHTML = "";

    // Verifica se nao existem movimentacoes
    if (movimentacoes.length === 0) {

        mensagem.textContent =
            "Nenhuma movimentação cadastrada.";

        return;
    }

    // Limpa a mensagem quando existem dados
    mensagem.textContent = "";

    // Percorre todas as movimentacoes
    for (let i = 0; i < movimentacoes.length; i++) {

        // Pega uma movimentacao da lista
        let item = movimentacoes[i];

        // Cria uma linha da tabela
        let linha = document.createElement("tr");

        // Organiza as informacoes
        let dados = [
            item.data.split("-").reverse().join("/"),
            item.descricao,
            item.tipo,
            formatarDinheiro(item.valor)
        ];

        // Cria as colunas com os dados
        for (let j = 0; j < dados.length; j++) {

            let coluna = document.createElement("td");

            // Coloca a informacao na coluna
            coluna.textContent = dados[j];

            // Adiciona a coluna na linha
            linha.appendChild(coluna);
        }

        // Cria uma coluna para o botao
        let colunaBotao = document.createElement("td");

        // Cria o botao excluir
        let botao = document.createElement("button");

        botao.textContent = "Excluir";

        // Quando clicar, chama a funcao excluir
        botao.onclick = function() {
            excluirMovimentacao(i);
        };

        // Coloca o botao na coluna
        colunaBotao.appendChild(botao);

        // Coloca a coluna na linha
        linha.appendChild(colunaBotao);

        // Adiciona a linha na tabela
        tabela.appendChild(linha);
    }
}

// Funcao para excluir uma movimentacao
function excluirMovimentacao(posicao) {

    // Pergunta se o usuario deseja excluir
    let confirmar = confirm(
        "Deseja excluir esta movimentação?"
    );

    // Se o usuario confirmar
    if (confirmar) {

        // Remove a movimentacao da lista
        movimentacoes.splice(posicao, 1);

        // Salva a lista atualizada no navegador
        localStorage.setItem(
            "movimentacoes",
            JSON.stringify(movimentacoes)
        );

        // Atualiza a tabela
        mostrarHistorico();
    }
}

// Mostra o historico ao abrir a pagina
mostrarHistorico();
