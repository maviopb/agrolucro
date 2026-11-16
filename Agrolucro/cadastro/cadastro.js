// Seleciona o formulario
let formulario = document.getElementById("formCadastro");

// Seleciona a tabela
let tabela = document.getElementById("listaProdutores");

// Busca os produtores que ja foram cadastrados
let produtores = JSON.parse(
    localStorage.getItem("produtores")
) || [];

// Funcao para mostrar os produtores na tabela
<<<<<<< HEAD
=======
// Funcao para mostrar os produtores na tabela
>>>>>>> ddad8e8 (Atualiza AgroLucro 2.0 com planejamento rural)
function mostrarProdutores() {

    // Limpa a tabela antes de atualizar
    tabela.innerHTML = "";

    // Percorre a lista de produtores
    for (let i = 0; i < produtores.length; i++) {

        let produtor = produtores[i];

        // Cria uma linha
        let linha = document.createElement("tr");

        // Organiza os dados do produtor
        let dados = [
            produtor.nome,
            produtor.email,
            produtor.telefone,
            produtor.propriedade
        ];

        // Cria uma coluna para cada informacao
        for (let j = 0; j < dados.length; j++) {

            let coluna = document.createElement("td");

            coluna.textContent = dados[j];

            linha.appendChild(coluna);
        }

<<<<<<< HEAD
        // Adiciona a linha na tabela
        tabela.appendChild(linha);
    }
}
=======
        // Cria a coluna do botao de remover
        let colunaAcoes = document.createElement("td");

        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.className = "btn-remover";
        botaoRemover.type = "button";

        // Quando clicar, remove o produtor desta posicao
        botaoRemover.addEventListener("click", function() {
            removerProdutor(i);
        });

        colunaAcoes.appendChild(botaoRemover);
        linha.appendChild(colunaAcoes);

        // Adiciona a linha na tabela
        tabela.appendChild(linha);
    }
}

// Funcao para remover um produtor pela posicao
function removerProdutor(posicao) {

    // Pergunta antes de apagar
    let confirmar = confirm("Deseja realmente remover este produtor?");

    if (!confirmar) {
        return;
    }

    // Remove 1 item da lista na posicao informada
    produtores.splice(posicao, 1);

    // Salva a lista atualizada no navegador
    localStorage.setItem(
        "produtores",
        JSON.stringify(produtores)
    );

    // Atualiza a tabela
    mostrarProdutores();

    // Mostra uma mensagem
    document.getElementById("mensagem").textContent =
        "Produtor removido com sucesso!";
}

    // Limpa a tabela antes de atualizar
    tabela.innerHTML = "";

    // Percorre a lista de produtores
    for (let i = 0; i < produtores.length; i++) {

        let produtor = produtores[i];

        // Cria uma linha
        let linha = document.createElement("tr");

        // Organiza os dados do produtor
        let dados = [
            produtor.nome,
            produtor.email,
            produtor.telefone,
            produtor.propriedade
        ];

        // Cria uma coluna para cada informacao
        for (let j = 0; j < dados.length; j++) {

            let coluna = document.createElement("td");

            coluna.textContent = dados[j];

            linha.appendChild(coluna);
        }

        // Adiciona a linha na tabela
        tabela.appendChild(linha);
    }
>>>>>>> ddad8e8 (Atualiza AgroLucro 2.0 com planejamento rural)

// Quando o formulario for enviado
formulario.addEventListener("submit", function(evento) {

    // Impede que a pagina recarregue
    evento.preventDefault();

    // Pega os valores digitados
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;
    let propriedade = document.getElementById("propriedade").value;

    // Cria um objeto com os dados
    let produtor = {
        nome: nome,
        email: email,
        telefone: telefone,
        propriedade: propriedade
    };

    // Adiciona o produtor na lista
    produtores.push(produtor);

    // Salva os dados no navegador
    localStorage.setItem(
        "produtores",
        JSON.stringify(produtores)
    );

    // Atualiza a tabela
    mostrarProdutores();

    // Mostra uma mensagem
    document.getElementById("mensagem").textContent =
        "Produtor cadastrado com sucesso!";

    // Limpa o formulario
    formulario.reset();
});

// Mostra os produtores ao abrir a pagina
mostrarProdutores();