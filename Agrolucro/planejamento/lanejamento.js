// Recupera os itens salvos no navegador.
let itens = JSON.parse(
    localStorage.getItem("planejamentoRural")
) || [];

// Seleciona os elementos da pagina.
let formulario = document.getElementById("formPlanejamento");
let listaItens = document.getElementById("listaItens");
let mensagem = document.getElementById("mensagem");

// Formata valores em reais.
function formatarDinheiro(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Formata a data para o padrao brasileiro.
function formatarData(data) {
    return data.split("-").reverse().join("/");
}

// Salva os itens no navegador.
function salvarItens() {
    localStorage.setItem(
        "planejamentoRural",
        JSON.stringify(itens)
    );
}

// Atualiza a tabela e o resumo.
function mostrarItens() {
    listaItens.innerHTML = "";

    let totalPrevisto = 0;
    let totalComprado = 0;

    // Percorre os itens cadastrados.
    for (let i = 0; i < itens.length; i++) {
        let item = itens[i];

        // Calcula o custo total do item.
        let custoTotal = item.quantidade * item.valor;

        if (item.situacao === "Planejado") {
            totalPrevisto += custoTotal;
        } else {
            totalComprado += custoTotal;
        }

        // Cria uma linha na tabela.
        let linha = document.createElement("tr");

        let dados = [
            item.nome,
            item.categoria,
            item.quantidade + " " + item.unidade,
            formatarDinheiro(custoTotal),
            formatarData(item.data),
            item.situacao
        ];

        // Adiciona as colunas com os dados.
        for (let j = 0; j < dados.length; j++) {
            let coluna = document.createElement("td");
            coluna.textContent = dados[j];
            linha.appendChild(coluna);
        }

        // Coluna dos botoes.
        let colunaAcoes = document.createElement("td");

        let botaoSituacao = document.createElement("button");
        botaoSituacao.className = "botao-situacao";

        if (item.situacao === "Planejado") {
            botaoSituacao.textContent = "Marcar comprado";
        } else {
            botaoSituacao.textContent = "Voltar a planejado";
        }

        botaoSituacao.onclick = function() {
            alterarSituacao(i);
        };

        let botaoExcluir = document.createElement("button");
        botaoExcluir.className = "botao-excluir";
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.onclick = function() {
            excluirItem(i);
        };

        colunaAcoes.appendChild(botaoSituacao);
        colunaAcoes.appendChild(botaoExcluir);
        linha.appendChild(colunaAcoes);

        listaItens.appendChild(linha);
    }

    // Atualiza os valores do resumo.
    document.getElementById("totalPrevisto").textContent =
        formatarDinheiro(totalPrevisto);

    document.getElementById("totalComprado").textContent =
        formatarDinheiro(totalComprado);

    document.getElementById("totalItens").textContent =
        itens.length;

    // Mostra uma mensagem quando nao ha registros.
    if (itens.length === 0) {
        mensagem.textContent = "Nenhum item cadastrado.";
    } else {
        mensagem.textContent = "";
    }
}

// Cadastra um novo investimento ou material.
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    let nome = document.getElementById("nome").value.trim();
    let categoria = document.getElementById("categoria").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let unidade = document.getElementById("unidade").value;
    let valor = Number(document.getElementById("valor").value);
    let data = document.getElementById("data").value;
    let situacao = document.getElementById("situacao").value;

    // Valida os valores informados.
    if (!nome || !categoria || !data ||
        !Number.isFinite(quantidade) || quantidade <= 0 ||
        !Number.isFinite(valor) || valor < 0) {
        alert("Preencha os campos corretamente.");
        return;
    }

    // Cria o objeto com os dados.
    let novoItem = {
        nome: nome,
        categoria: categoria,
        quantidade: quantidade,
        unidade: unidade,
        valor: valor,
        data: data,
        situacao: situacao
    };

    // Adiciona o item a lista.
    itens.push(novoItem);

    // Salva e atualiza a pagina.
    salvarItens();
    mostrarItens();

    // Limpa o formulario.
    formulario.reset();

    alert("Item cadastrado com sucesso!");
});

// Altera a situacao da compra.
function alterarSituacao(indice) {
    if (itens[indice].situacao === "Planejado") {
        itens[indice].situacao = "Comprado";
    } else {
        itens[indice].situacao = "Planejado";
    }

    salvarItens();
    mostrarItens();
}

// Exclui um item do planejamento.
function excluirItem(indice) {
    let confirmar = confirm("Deseja excluir este item?");

    if (confirmar) {
        itens.splice(indice, 1);
        salvarItens();
        mostrarItens();
    }
}

// Exibe os itens quando a pagina abre.
mostrarItens();